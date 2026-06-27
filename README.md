# Airbnb Price Prediction Web Application

> **Live Demo:** https://airbnb-price-api.vercel.app/

An end-to-end machine learning web application that predicts Airbnb listing prices in New York City. The application demonstrates the complete machine learning workflow, including data preprocessing, exploratory data analysis, feature engineering, model training, REST API development, cloud deployment, and frontend integration.

The trained machine learning model is served through a Flask REST API hosted on Google Cloud Run and consumed by a React frontend deployed on Vercel.

---

# Live Application

**Frontend**

https://airbnb-price-api.vercel.app/

**Backend**

A Flask REST API hosted on Google Cloud Run serving predictions from a trained Random Forest Regressor.

---

# Project Overview

The objective of this project was to build and deploy a complete machine learning application capable of estimating Airbnb listing prices based on listing characteristics.

Unlike a traditional machine learning notebook, this project demonstrates the entire deployment pipeline:

- Data preprocessing
- Exploratory data analysis
- Feature engineering
- Model training
- Model evaluation
- Model serialization
- REST API development
- Cloud deployment
- Frontend integration

The final application allows users to submit Airbnb listing information through a web interface and receive predicted nightly prices in real time.

---

# System Architecture

```
                     React Frontend (Vercel)
                               │
                               │ Axios HTTP Request
                               ▼
                 Flask REST API (Google Cloud Run)
                               │
                               ▼
             Scikit-learn Preprocessing Pipeline
                               │
                               ▼
                  Random Forest Regressor
                               │
                               ▼
                 Predicted Airbnb Nightly Price
```

---

# Project Structure

```
Airbnb_Project/

│
├── deployment/
│   ├── app.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── airbnb_price_model.joblib
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── notebook/
│   └── Airbnb_DS_Assessment.ipynb
│
├── README.md
└── .gitignore
```

---

# Workflow

## 1. Data Collection

The project uses the Airbnb NYC 2019 dataset containing listing information including:

- Neighbourhood
- Room type
- Geographic coordinates
- Availability
- Host information
- Review statistics
- Listing prices

---

## 2. Data Cleaning

The dataset was cleaned before model development by:

- Removing unnecessary columns
- Handling missing values
- Checking duplicate records
- Correcting data types
- Preparing numerical and categorical variables

This ensured that the training data was consistent and suitable for machine learning.

---

## 3. Exploratory Data Analysis

Exploratory Data Analysis (EDA) was performed to understand the dataset and identify relationships between variables.

The analysis included:

- Distribution of Airbnb prices
- Room type frequencies
- Neighbourhood distributions
- Correlation analysis
- Missing value analysis
- Outlier inspection

The insights obtained during EDA informed the feature engineering process.

---

## 4. Feature Engineering

Additional features were created to improve predictive performance.

Engineered features include:

- last_review_year
- last_review_month
- has_review

The target variable (`price`) was log-transformed using:

```python
np.log1p(price)
```

This transformation reduces skewness and improves regression performance.

Predictions are converted back to the original dollar scale using:

```python
np.expm1(prediction)
```

---

## 5. Data Preprocessing

A Scikit-learn preprocessing pipeline was constructed using:

- ColumnTransformer
- OneHotEncoder
- StandardScaler

The pipeline automatically performs preprocessing during both training and inference, ensuring consistency between development and deployment.

---

## 6. Model Training

Three regression algorithms were trained and evaluated:

- Ridge Regression
- Random Forest Regressor
- Gradient Boosting Regressor

Each model was evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score

After comparing model performance, the **Random Forest model** achieved the best overall performance and was selected as the final model.

---

## 7. Model Serialization

The trained preprocessing pipeline and Random Forest model were combined into a single Scikit-learn Pipeline and serialized using Joblib.

```python
joblib.dump(final_pipeline, "airbnb_price_model.joblib")
```

Serializing the entire pipeline preserves both preprocessing and prediction logic for production inference.

---

## 8. Backend Development

A REST API was developed using Flask.

The backend exposes two endpoints:

### Health Check

```
GET /
```

Returns

```json
{
    "message": "Airbnb price prediction API is running"
}
```

---

### Price Prediction

```
POST /predict
```

Incoming JSON is converted into a Pandas DataFrame before being passed through the saved Scikit-learn Pipeline.

Example Request

```json
{
    "neighbourhood_group": "Manhattan",
    "neighbourhood": "Harlem",
    "room_type": "Private room",
    "minimum_nights": 2,
    "number_of_reviews": 10,
    "reviews_per_month": 1.2,
    "calculated_host_listings_count": 1,
    "availability_365": 100,
    "latitude": 40.8116,
    "longitude": -73.9465,
    "last_review_year": 2019,
    "last_review_month": 6,
    "has_review": 1
}
```

Example Response

```json
{
    "predicted_price": 89.18
}
```

---

## 9. Cloud Deployment

The Flask API was containerized using Docker and deployed to Google Cloud Run.

Cloud Build automatically rebuilds and deploys the application whenever changes are pushed to GitHub.

The backend provides a scalable, serverless inference service requiring no manual infrastructure management.

---

## 10. Frontend Development

A responsive user interface was developed using:

- React
- Vite
- Axios

Users can:

- Enter Airbnb listing details
- Submit prediction requests
- Receive predicted nightly prices
- Communicate directly with the deployed REST API

The frontend is hosted on Vercel and communicates with the backend using HTTPS.

---

## 11. End-to-End Integration

The complete prediction workflow is:

```
User

↓

React Frontend

↓

Axios HTTP Request

↓

Google Cloud Run

↓

Flask REST API

↓

Scikit-learn Pipeline

↓

Random Forest model

↓

Predicted Airbnb Price
```

---

# Technologies Used

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

## Backend

- Flask
- Flask-CORS
- Gunicorn

## Frontend

- React
- Vite
- Axios

## Cloud

- Google Cloud Run
- Cloud Build
- Artifact Registry
- Vercel

## Development Tools

- Git
- GitHub
- VS Code
- Postman

---

# Challenges Encountered

During development, several production-related challenges were encountered and resolved, including:

- Managing Scikit-learn version compatibility when loading serialized models.
- Configuring Docker for local testing.
- Deploying containerized applications to Google Cloud Run.
- Resolving CORS issues between the React frontend and Flask backend.
- Managing backend and frontend dependencies.
- Connecting the deployed REST API to a React application using Axios.

These challenges provided practical experience with deploying machine learning applications to production environments.

---

# Skills Demonstrated

- Data Cleaning
- Exploratory Data Analysis
- Feature Engineering
- Regression Modeling
- Random Forest Regression
- Model Serialization
- REST API Development
- Cloud Deployment
- React Development
- Frontend/Backend Integration
- Machine Learning Deployment
- Git Version Control
- Production Debugging

---



