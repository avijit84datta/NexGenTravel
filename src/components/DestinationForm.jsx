import React, { useState } from 'react';
import '../DestinationForm.css';

const DestinationForm = ({ mode, initialData, onSubmit, onClose }) => {
    console.log('DestinationForm rendering!');
    const [destination, setDestination] = useState(
        initialData || { name: '', country: '', description: '' }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(destination);
    };

    return (
        <div className={styles.destinationformcontainer}>
            <h2>{mode === 'edit' ? 'Edit Destination' : 'Create Destination'}</h2>
            <form onSubmit={handleSubmit} className={styles.destinationForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={destination.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={destination.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={destination.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={`${styles.btn} ${styles.primary}`}>
                        {mode === 'edit' ? 'Update' : 'Create'}
                    </button>
                    <button type="button" className={`${styles.btn} ${styles.secondary}`} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DestinationForm;
