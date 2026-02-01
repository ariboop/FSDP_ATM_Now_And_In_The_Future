(function(){
  const streamEl = document.getElementById('stream');
  const refreshBtn = document.getElementById('refreshBtn');
  const exportBtn = document.getElementById('exportJson');
  const togglePoll = document.getElementById('togglePoll');
  const intervalInput = document.getElementById('interval');
  const searchInput = document.getElementById('searchInput');
  const statsEl = document.querySelector('.stats');
  const sessionsList = document.getElementById('sessionsList');

  let polling = false;
  let pollId = null;
  let lastIds = new Set();
  let currentSession = null;

  function fmtTime(ts){ try { return new Date(ts).toLocaleString(); } catch(e){ return ts; } }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  function renderMessage(m){
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + (m.role === 'user' ? 'user' : 'assistant');
    const meta = document.createElement('div'); meta.className = 'meta';
    meta.innerHTML = `<div>${fmtTime(m.timestamp)}</div><div>${m.sessionID || ''}</div><div style="margin-top:6px;color:var(--muted);font-size:12px">${m.intent && (m.intent.intent||m.intent) ? (m.intent.intent||m.intent) : ''}</div>`;
    const body = document.createElement('div'); body.className = 'body';
    const txt = document.createElement('div'); txt.className = 'text'; txt.textContent = m.text || (m.voiceTranscript || '') || JSON.stringify(m.payload || {});
    const meta2 = document.createElement('div'); meta2.className = 'meta2';
    let extras = [];
    if (m.isVoice) extras.push('voice');
    if (m.audio && m.audio.id) extras.push(`<a href="/api/conversations/audio/${m.audio.id}" target="_blank">play audio</a>`);
    if (m.payload) extras.push(`<code>${JSON.stringify(m.payload)}</code>`);
    if (m.voiceTranscript) extras.push(`<span title="voice transcript">"${m.voiceTranscript}"</span>`);
    meta2.innerHTML = extras.join(' · ');
    body.appendChild(txt); body.appendChild(meta2);
    wrap.appendChild(meta); wrap.appendChild(body);
    return wrap;
  }

  async function fetchMessages({session='', q=''} = {}){
    const url = session ? `/api/conversations/context?sessionID=${encodeURIComponent(session)}` : '/api/conversations/context?limit=200';
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const txt = await res.text().catch(()=>'<no-body>');
        throw new Error(`fetch ${url} failed: ${res.status} ${res.statusText} - ${txt}`);
      }
      const json = await res.json();
      let rows = Array.isArray(json) ? json : (json.items || []);
      rows = rows.map(r => (Object.assign({}, r, { sessionID: r.sessionID || r.session_id })));
      if (q) { const s = q.toLowerCase(); rows = rows.filter(r => (r.text||'').toLowerCase().includes(s) || JSON.stringify(r.payload||{}).toLowerCase().includes(s)); }
      return rows;
    } catch (err) {
      console.warn('Failed to fetch messages', err);
      statsEl.textContent = 'Failed to load messages — see console';
      return [];
    }
  }

  async function populateSessions() {
    try {
      const res = await fetch('/api/conversations/context?limit=200');
      if (!res.ok) {
        console.warn('populateSessions: bad response', res.status);
        return;
      }
      const json = await res.json();
      const data = Array.isArray(json) ? json : (json.items || []);
      console.log('[admin] fetched', data.length, 'items');
      
      // Group by session and count messages
      const sessionMap = new Map();
      (data || []).forEach(msg => {
        const sid = msg.sessionID || msg.session_id || 'unknown';
        if (!sessionMap.has(sid)) {
          sessionMap.set(sid, { session: sid, count: 0, lastMsg: null });
        }
        const info = sessionMap.get(sid);
        info.count++;
        if (!info.lastMsg || (msg.created_at > info.lastMsg)) {
          info.lastMsg = msg.created_at;
        }
      });
      console.log('[admin] grouped into', sessionMap.size, 'sessions');
      
      // Render sessions list
      sessionsList.innerHTML = '';
      
      // Sort by last message (most recent first)
      const sorted = Array.from(sessionMap.values()).sort((a, b) => {
        const ta = new Date(a.lastMsg || 0).getTime();
        const tb = new Date(b.lastMsg || 0).getTime();
        return tb - ta;
      });
      
      if (sorted.length === 0) {
        sessionsList.innerHTML = '<div style="color: var(--muted); font-size: 12px; padding: 8px;">No sessions yet</div>';
        return;
      }
      
      sorted.forEach(info => {
        const item = document.createElement('div');
        item.className = 'session-item' + (currentSession === info.session ? ' active' : '');
        item.innerHTML = `
          <span class="session-item-title">${escapeHtml(info.session)}</span>
          <span class="session-item-count">${info.count} message${info.count !== 1 ? 's' : ''}</span>
        `;
        item.addEventListener('click', () => {
          currentSession = info.session;
          document.querySelectorAll('.session-item').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
          lastIds.clear();
          renderMessages();
        });
        sessionsList.appendChild(item);
      });
    } catch (err) {
      console.warn('populateSessions error:', err);
    }
  }

  async function renderMessages() {
    const q = searchInput.value.trim();
    const rows = await fetchMessages({ session: currentSession || '', q });
    if (!rows.length){
      streamEl.innerHTML = '<div class="empty">No stored messages found.</div>';
      statsEl.textContent = '0 messages';
      return;
    }
    statsEl.textContent = `${rows.length} message(s) — last: ${fmtTime(rows[rows.length-1].timestamp)}`;
    if (polling){
      let appended = 0;
      for (const r of rows){ if (!lastIds.has(r.id)){ streamEl.insertBefore(renderMessage(r), streamEl.firstChild); lastIds.add(r.id); appended++; } }
      if (appended) streamEl.classList.add('pulse'); setTimeout(()=>streamEl.classList.remove('pulse'),400);
      return;
    }
    streamEl.innerHTML = '';
    rows.slice().reverse().forEach(r=>{ streamEl.appendChild(renderMessage(r)); lastIds.add(r.id); });
  }

  refreshBtn.addEventListener('click', () => { lastIds.clear(); populateSessions(); renderMessages(); });
  searchInput.addEventListener('input', debounce(()=>{ lastIds.clear(); renderMessages(); }, 300));

  togglePoll.addEventListener('click', ()=>{
    polling = !polling;
    if (polling) {
      togglePoll.textContent = 'Stop';
      togglePoll.classList.add('polling-active');
      const sec = Math.max(1, Number(intervalInput.value) || 3);
      pollId = setInterval(()=>{ populateSessions(); renderMessages(); }, sec*1000);
      populateSessions();
      renderMessages();
    } else {
      togglePoll.textContent = 'Start';
      togglePoll.classList.remove('polling-active');
      clearInterval(pollId);
      pollId = null;
    }
  });

  exportBtn.addEventListener('click', async ()=>{
    const rows = await fetchMessages({ session: currentSession || '' });
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(rows, null, 2));
    const a = document.createElement('a'); a.href = dataStr; a.download = `conversations${currentSession?'-'+currentSession:''}.json`; document.body.appendChild(a); a.click(); a.remove();
  });

  function debounce(fn, ms){ let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), ms); }; }

  (async function init(){
    await populateSessions();
    // Pre-select demo-session if it exists
    const demoItem = Array.from(sessionsList.querySelectorAll('.session-item')).find(el => el.textContent.includes('demo-session'));
    if (demoItem) {
      currentSession = 'demo-session';
      demoItem.classList.add('active');
    }
    await renderMessages();
    
    // Auto-start polling on load for real-time tracking
    polling = true;
    togglePoll.textContent = 'Stop';
    togglePoll.classList.add('polling-active');
    intervalInput.value = '2'; // 2-second refresh for real-time
    const sec = 2;
    pollId = setInterval(()=>{ populateSessions(); renderMessages(); }, sec*1000);
  })();
})();