# Data Science Dashboard

A full-stack web application to visualize and explore data science analyses including clustering and regression models based on car details dataset.

## Project Structure

```
├── client/                 # React frontend
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── DataTable.js
│   │   │   ├── Clustering.js
│   │   │   └── Regression.js
├── server/                 # Flask backend API
│   ├── app.py              # Flask server
│   └── requirements.txt    # Python dependencies
└── Dataset/                # Data files
```

## Features

- **Dashboard**: Overview of dataset statistics and model performance
- **Data Exploration**: Interactive table view of the dataset
- **Clustering Analysis**: Visualizations of KMeans and KMedoids clustering results
- **Regression Analysis**: Comparison of Linear Regression and Random Forest models

## Setup & Installation

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```
   python app.py
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## API Endpoints

- `/api/data` - Get raw data from the dataset
- `/api/statistics` - Get statistical summary of the dataset
- `/api/clustering` - Get clustering analysis results
- `/api/regression` - Get regression model results

## Technologies Used

- **Frontend**: React, Chart.js, Axios
- **Backend**: Flask, Pandas, Scikit-learn
- **Data Visualization**: React-ChartJS-2 "# DS_Project" 
