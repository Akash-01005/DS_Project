from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)

# Load data
def load_data():
    try:
        return pd.read_csv('Dataset/Cleaned_Car_Details.csv')
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()

@app.route('/api/data', methods=['GET'])
def get_data():
    df = load_data()
    if df.empty:
        return jsonify({"error": "Failed to load data"}), 500
    return jsonify(df.head(50).to_dict(orient='records'))

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    df = load_data()
    if df.empty:
        return jsonify({"error": "Failed to load data"}), 500
    
    stats = {
        "summary": json.loads(df.describe().to_json()),
        "columns": df.columns.tolist(),
        "rows": len(df)
    }
    return jsonify(stats)

@app.route('/api/clustering', methods=['GET'])
def get_clustering():
    # Simplified mock response based on your cluster.ipynb
    clusters = {
        "kmeans": {
            "optimal_clusters": 4,
            "silhouette_score": 0.58,
            "cluster_counts": {
                "0": 245,
                "1": 120,
                "2": 312,
                "3": 98
            }
        },
        "kmedoids": {
            "optimal_clusters": 3,
            "silhouette_score": 0.52
        }
    }
    return jsonify(clusters)

@app.route('/api/regression', methods=['GET'])
def get_regression():
    # Simplified mock response based on your Regression_models.ipynb
    regression_results = {
        "linear_regression": {
            "r2_score": 0.85,
            "mse": 12.45
        },
        "random_forest": {
            "r2_score": 0.92,
            "mse": 6.78
        }
    }
    return jsonify(regression_results)

@app.route('/api/images/<path:filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory('Dataset', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 