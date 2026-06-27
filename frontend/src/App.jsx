import { useState } from "react";
import axios from "axios";
import "./App.css";

import FormInput from "./components/FormInput";
import SelectInput from "./components/SelectInput";
import PredictionCard from "./components/PredictionCard";

function App() {
  const [formData, setFormData] = useState({
    neighbourhood_group: "Manhattan",
    neighbourhood: "Harlem",
    room_type: "Private room",
    minimum_nights: 2,
    number_of_reviews: 10,
    reviews_per_month: 1.2,
    calculated_host_listings_count: 1,
    availability_365: 100,
    latitude: 40.8116,
    longitude: -73.9465,
    last_review_year: 2019,
    last_review_month: 6,
    has_review: 1
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : Number(value)
    });
  };

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(

            "https://airbnb-price-api-207950487991.northamerica-northeast1.run.app/predict",

            formData

        );

        setPrediction(response.data.predicted_price);

    }

    catch (error) {

        console.error(error);

        alert("Prediction failed.");

    }

};

  return (
    <div className="container">
      <div className="card">
        <h1>🏠 Airbnb Price Predictor</h1>
        <p>
          Estimate the nightly price of an Airbnb listing using a machine
          learning model deployed on Google Cloud Run.
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <SelectInput
            label="Neighbourhood Group"
            name="neighbourhood_group"
            value={formData.neighbourhood_group}
            onChange={handleChange}
            options={["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"]}
          />

          <FormInput
            label="Neighbourhood"
            name="neighbourhood"
            value={formData.neighbourhood}
            onChange={handleChange}
          />

          <SelectInput
            label="Room Type"
            name="room_type"
            value={formData.room_type}
            onChange={handleChange}
            options={["Private room", "Entire home/apt", "Shared room"]}
          />

          <FormInput label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} type="number" />
          <FormInput label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} type="number" />
          <FormInput label="Minimum Nights" name="minimum_nights" value={formData.minimum_nights} onChange={handleChange} type="number" />
          <FormInput label="Number of Reviews" name="number_of_reviews" value={formData.number_of_reviews} onChange={handleChange} type="number" />
          <FormInput label="Reviews per Month" name="reviews_per_month" value={formData.reviews_per_month} onChange={handleChange} type="number" />
          <FormInput label="Host Listings Count" name="calculated_host_listings_count" value={formData.calculated_host_listings_count} onChange={handleChange} type="number" />
          <FormInput label="Availability 365" name="availability_365" value={formData.availability_365} onChange={handleChange} type="number" />
          <FormInput label="Last Review Year" name="last_review_year" value={formData.last_review_year} onChange={handleChange} type="number" />
          <FormInput label="Last Review Month" name="last_review_month" value={formData.last_review_month} onChange={handleChange} type="number" />

          <SelectInput
            label="Has Review"
            name="has_review"
            value={formData.has_review}
            onChange={handleChange}
            options={[1, 0]}
          />

          <button type="submit" className="predict-btn">
            Predict Price
          </button>
        </form>

        <PredictionCard prediction={prediction} />
      </div>
    </div>
  );
}

export default App;