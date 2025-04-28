@echo off
echo Starting Data Science Dashboard...

echo Starting Flask backend server...
start cmd /k "cd server && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python app.py"

echo Starting React frontend...
start cmd /k "cd client && npm install && npm start"

echo Application is starting up! The dashboard will open in your browser shortly. 