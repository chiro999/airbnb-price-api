# Airbnb Price Prediction API

A machine learning API that predicts Airbnb listing prices based on listing characteristics. The model was trained on the Airbnb NYC 2019 dataset, exposed through a Flask REST API, and deployed on Google Cloud Run.

---

## Project Overview

This project demonstrates the complete machine learning lifecycle:

- Data cleaning and preprocessing
- Exploratory Data Analysis (EDA)
- Feature engineering
- Model training and evaluation
- Model serialization with Joblib
- REST API development using Flask
- Cloud deployment with Google Cloud Run

---

## Project Structure

```
Airbnb_Project/
│
├── deployment/
│   ├── app.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── airbnb_price_model.joblib
│
├── notebook/
│   └── Airbnb_DS_Assessment.ipynb
│
├── .gitignore
└── README.md
```

---

## Dataset

Dataset:

**AB_NYC_2019.csv**

The dataset contains Airbnb listings in New York City including:

- Neighbourhood
- Room type
- Latitude
- Longitude
- Minimum nights
- Number of reviews
- Availability
- Host listing count
- Review information

---

## Feature Engineering

Additional engineered features include:

- `last_review_year`
- `last_review_month`
- `has_review`

The target variable was log-transformed using:

```python
np.log1p(price)
```

Predictions are converted back to dollar values using:

```python
np.expm1(prediction)
```

---

## Model

The project trains several regression models and selects the best-performing pipeline.

Evaluation metrics include:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score

The trained pipeline is saved using Joblib:

```python
joblib.dump(final_pipeline, "airbnb_price_model.joblib")
```

---

## REST API

### Health Check

```
GET /
```

Response

```json
{
    "message": "Airbnb price prediction API is running!"
}
```

---

### Predict Price

```
POST /predict
```

Example request

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

Example response

```json
{
    "predicted_price": 89.18
}
```

---

## Local Deployment

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/airbnb-price-api.git
```

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r deployment/requirements.txt
```

Run the API

```bash
cd deployment

python app.py
```

The API will be available at

```
http://127.0.0.1:8080
```

---

## Cloud Deployment

This application is deployed using:

- Google Cloud Run
- Cloud Build
- Artifact Registry
- GitHub

The application is automatically containerized and deployed using the included Dockerfile.

---

## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Flask
- Joblib
- Google Cloud Run
- Cloud Build
- GitHub
- Docker

---

