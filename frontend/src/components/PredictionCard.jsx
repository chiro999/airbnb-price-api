function PredictionCard({ prediction }) {

    if (prediction === null) return null;

    return (

        <div className="prediction-card">

            <h2>Estimated Nightly Price</h2>

            <h1>${prediction}</h1>

        </div>

    );

}

export default PredictionCard;