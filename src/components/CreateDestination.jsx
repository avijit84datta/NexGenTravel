import React, { useState } from 'react';
import apiClient from '../services/api';
import '../CreateDestination.css';

const CreateDestination = () => {
    const [destination, setDestination] = useState({
        name: '',
        country: '',
        description: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/destination', destination);
            setMessage(`Destination "${response.data.name}" created successfully!`);
            setDestination({ name: '', country: '', description: '' });
        } catch (error) {
            console.error('Error creating destination:', error);
            setMessage('An error occurred while creating the destination.');
        }
    };

    return (
        <div>
            <h2>Create Destination</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={destination.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={destination.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={destination.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Destination</button>
                <div>{message && <p>{message}</p>}</div>
            </form>
        </div>
    );
};
export default CreateDestination;