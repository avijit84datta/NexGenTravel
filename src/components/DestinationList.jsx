import React, { useState, useEffect } from 'react';
import '../DestinationList.css';
import apiClient from "../services/api";

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDestinations = async () => {
            try {
                const response = await apiClient.get("/Destination")
                setDestinations(response.data);  // Set the fetched data into the state
            } catch (err) {
                setError('Failed to fetch destinations');  // Handle errors
            }
        };
        loadDestinations();
    }, []);  // Empty array to run only once on mount

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="destination-list">
            {destinations.map((destination) => (
                <div key={destination.id} className="destination-item">
                    <h2 className="destination-name">{destination.name}</h2>
                    <p className="destination-country">{destination.country}</p>
                    <p className="destination-description">{destination.description}</p>
                </div>
            ))}
        </div>
    );
};

export default DestinationList;