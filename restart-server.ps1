# Restart Vite Dev Server
Write-Host "Stopping existing Node/Vite processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "`nStarting Vite dev server..." -ForegroundColor Green
Set-Location "d:\lil jwrld\Sneakers\sneakers-react-app"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "`nDev server is starting..." -ForegroundColor Cyan
Write-Host "Visit: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Test images: http://localhost:5173/test-images.html" -ForegroundColor Cyan
