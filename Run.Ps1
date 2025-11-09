Write-Host "this file runs the frontend and backend of the project."
# Ensure you're in the root folder of the project
Write-Host "Moving to project directory..."


Set-Location -Path "$PSScriptRoot"
Write-Host "Starting the backend server..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList ".\app.js"
Write-Host "Backend server started."

# prevent vue.js from blocking the script, and open it in a new window
Write-Host "Starting the frontend server in a new window..."

Start-Process powershell.exe -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$PSScriptRoot\my-vue-app'; npm.cmd run serve"
)

Write-Host "Frontend window launched."


Write-Host "Both backend and frontend servers are running."


Write-Host "Project running backend server... Press Ctrl+C to stop."

while ($true) {
    Start-Sleep -Seconds 1
}