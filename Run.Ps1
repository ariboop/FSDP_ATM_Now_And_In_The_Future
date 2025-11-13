Write-Host "this file runs the frontend and backend of the project."
Write-Host "RUN Startup.Ps1 FIRST."

# Ensure you're in the root folder of the project
Write-Host "Moving to project directory..."

# backend server -----------------
Set-Location -Path "$PSScriptRoot"
Write-Host "Starting the backend server..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "backend/app.js"
Write-Host "Backend server started."

# frontend server -----------------

# prevent vue.js from blocking the script, and open it in a new window
Write-Host "Starting the frontend server in a new window..."


Start-Process powershell.exe -ArgumentList @(
    '-NoExit',
    '-Command',
    ' Set-Location ''./frontend''; npm.cmd run serve'
)
Write-Host "Frontend window launched."


Write-Host "Both backend and frontend servers are running."


Write-Host "Project running backend server... Press Ctrl+C to stop."


# Prevent the script from blowing up user terminal
while ($true) {
    Start-Sleep -Seconds 2
}