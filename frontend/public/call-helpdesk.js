

document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.small-circle')) return;

  (function () {
    const SHOW_AFTER = 3000; // ms before popup appears
    let timer = null;
    let interacted = false;
    const anchorSelector = '.small-circle';

    function isInteractive(el) {
      return el && (el.closest && (el.closest('a,button,[role="button"],input,select,textarea,[onclick]') !== null));
    }

    function onUserInteraction(e) {
      if (isInteractive(e.target)) {
        interacted = true;
        clearTimeout(timer);
        window.removeEventListener('click', onUserInteraction, true);
      }
    }

    window.addEventListener('click', onUserInteraction, true);

    timer = setTimeout(() => {
      if (interacted) return;
      showAiPopup();
    }, SHOW_AFTER);

    function showAiPopup() {
      const anchor = document.querySelector(anchorSelector);
      const popup = document.createElement('div');
      popup.id = 'ai-helpdesk-popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-live', 'polite');
      popup.innerHTML = '<div class="popup-arrow" aria-hidden="true"></div><div class="popup-body"><p class="popup-message">Would you like AI assistance with this call?</p><div class="popup-controls"><button id="ai-go">Yes — AI help</button><button id="ai-skip" class="secondary">No thanks</button></div></div>';
      document.body.appendChild(popup);

      // fixed width so we can position immediately
      const POPUP_WIDTH = 260;
      popup.style.width = POPUP_WIDTH + 'px';

      positionPopup(popup, anchor);
      // animate in
      requestAnimationFrame(() => popup.classList.add('show'));

      // wait for explicit user action — no automatic redirect
      popup.addEventListener('click', (ev) => {
        const id = ev.target.id;
        if (id === 'ai-go') {
          window.location.href = 'ai-helpdesk-response.html';
        } else if (id === 'ai-skip') {
          popup.remove();
        }
      });

      // popup counts as interaction
      window.removeEventListener('click', onUserInteraction, true);
      window.addEventListener('resize', () => positionPopup(popup, anchor));
    }

    function positionPopup(popup, anchor) {
      const margin = 8;
      let left = window.innerWidth / 2 - popup.offsetWidth / 2;
      let top = window.innerHeight - popup.offsetHeight - 24; // fallback
      if (anchor && anchor.getBoundingClientRect) {
        const rect = anchor.getBoundingClientRect();
        left = Math.min(Math.max(rect.left + rect.width / 2 - popup.offsetWidth / 2, margin), window.innerWidth - popup.offsetWidth - margin);
        top = rect.bottom + 8;
        // if not enough space below, position above the anchor
        if (top + popup.offsetHeight + margin > window.innerHeight) {
          top = rect.top - popup.offsetHeight - 8;
        }
      }
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
    }



  })();
});
