// import React, { useState } from "react";
// import axios from "axios";

// const WeightedMovingAverageForm = () => {
//     const [dataPoints, setDataPoints] = useState({});
//     const [weightedPeriod, setWeightedPeriod] = useState(3);
//     const [weights, setWeights] = useState([]);
//     const [results, setResults] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/calculate-wma/", {
//                 data_points: dataPoints,
//                 weighted_period: weightedPeriod,
//                 weights,
//             });
//             setResults(response.data);
//         } catch (error) {
//             console.error("Error calculating WMA:", error.response.data);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>Data Points (JSON Format):</label>
//                 <textarea
//                     value={JSON.stringify(dataPoints)}
//                     onChange={(e) => setDataPoints(JSON.parse(e.target.value))}
//                 />
//                 <label>Weighted Period:</label>
//                 <input
//                     type="number"
//                     value={weightedPeriod}
//                     onChange={(e) => setWeightedPeriod(Number(e.target.value))}
//                 />
//                 <label>Weights (Comma-Separated):</label>
//                 <input
//                     type="text"
//                     value={weights.join(",")}
//                     onChange={(e) => setWeights(e.target.value.split(",").map(Number))}
//                 />
//                 <button type="submit">Calculate WMA</button>
//             </form>
//             {results && (
//                 <div>
//                     <h3>Results:</h3>
//                     <p>Forecasted Value: {results.forecasted_value}</p>
//                     <p>MAD: {results.mad}</p>
//                     <p>MSE: {results.mse}</p>
//                     <p>MAPE: {results.mape}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default WeightedMovingAverageForm;
