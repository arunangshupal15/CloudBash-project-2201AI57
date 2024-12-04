import React, { useState } from "react";
import axios from "axios";

const RecommendationWidget = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      // Make the GET request to the updated URL with the correct product ID
      const productId = "31602544"; // Example product ID, can be dynamically passed
      const response = await axios.post(`https://www.myntra.com/gateway/v2/product/${productId}/related`);

      // Assuming the API returns an object with a `products` array in its response
      if (response.data && response.data.products) {
        setRecommendations(response.data.products); // Set the recommendations data
      } else {
        setError("No related products found.");
      }
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>Recommended Products</h3>
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendations.length > 0 && (
        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationWidget;
