Write-Host "Starting Car Shortlist Copilot full-stack app..." -ForegroundColor Cyan

# Start Spring Boot backend in a new window
Write-Host "Starting Backend (Spring Boot) on port 8080..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; mvn spring-boot:run"

# Start Vite React-TS frontend in a new window
Write-Host "Starting Frontend (Vite) on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "Backend API:  http://localhost:8080/api/cars" -ForegroundColor Green
Write-Host "H2 Console:   http://localhost:8080/h2-console (JDBC: jdbc:h2:mem:cardb, User: sa, Pass: empty)" -ForegroundColor Green
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "Both processes are launching in separate windows. Enjoy comparing!" -ForegroundColor Cyan
