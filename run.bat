@echo off
echo Starting Car Shortlist Copilot full-stack app...

echo Starting Backend (Spring Boot) on port 8080...
start cmd /k "cd backend && mvn spring-boot:run"

echo Starting Frontend (Vite) on port 5173...
start cmd /k "cd frontend && npm run dev"

echo --------------------------------------------------------
echo Backend API:  http://localhost:8080/api/cars
echo H2 Console:   http://localhost:8080/h2-console (JDBC: jdbc:h2:mem:cardb, User: sa)
echo Frontend App: http://localhost:5173
echo --------------------------------------------------------
echo Both processes are launching in separate console windows.
pause
