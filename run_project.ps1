Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   Starting Real Estate Listing Project       " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 1. Start Django Backend
Write-Host "[1/2] Starting Django REST Backend on http://127.0.0.1:8000/..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver"

# 2. Start Vite React Frontend
Write-Host "[2/2] Starting Vite React Frontend on http://localhost:5173/..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Done! Separate PowerShell windows have been spawned for both servers." -ForegroundColor Green
Write-Host "- Backend API: http://127.0.0.1:8000/api/" -ForegroundColor Green
Write-Host "- Frontend SPA: http://localhost:5173/" -ForegroundColor Green
Write-Host "Press any key to close this window..." -ForegroundColor Gray
