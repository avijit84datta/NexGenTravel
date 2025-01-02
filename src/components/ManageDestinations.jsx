import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinations, updateDestination, selectDestination, clearSelection } from '../redux/destinationsSlice';
import DestinationForm from './DestinationForm';
import ReactDOM from 'react-dom';

const ManageDestinations = () => {
    const dispatch = useDispatch();
    const { list: destinations, selectedDestination } = useSelector((state) => state.destinations);

    const [popupWindow, setPopupWindow] = useState(null);

    useEffect(() => {
        dispatch(fetchDestinations());
    }, [dispatch]);

    const openEditModal = (destination) => {
        dispatch(selectDestination(destination));

        // Open a new popup window
        const newWindow = window.open(
            '',
            'EditDestination',
            'width=600,height=400,left=200,top=200'
        );

        // Write content for the popup
        if (newWindow) {
            const popupContent = newWindow.document.createElement('div');
            popupContent.id = 'popup-root';
            newWindow.document.body.appendChild(popupContent);
            setPopupWindow(newWindow);
        }
    };

    const closePopup = () => {
        dispatch(clearSelection());
        if (popupWindow) {
            popupWindow.close();
            setPopupWindow(null);
        }
    };

    const handleUpdate = async (updatedDestination) => {
        await dispatch(updateDestination(updatedDestination));
        closePopup();
    };

    useEffect(() => {
        // Cleanup popup when component unmounts
        return () => {
            if (popupWindow) {
                popupWindow.close();
            }
        };
    }, [popupWindow]);

    return (
        <div>
            <h2>Manage Destinations</h2>
            <ul>
                {destinations.map((destination) => (
                    <li key={destination.id}>
                        {destination.name} ({destination.country})
                        <button onClick={() => openEditModal(destination)}>Edit</button>
                    </li>
                ))}
            </ul>

            {popupWindow && selectedDestination && (
                // Inject DestinationForm into the popup
                ReactDOM.createPortal(
                    <DestinationForm
                        mode="edit"
                        initialData={selectedDestination}
                        onSubmit={handleUpdate}
                        onClose={closePopup}
                    />,
                    popupWindow.document.getElementById('popup-root')
                )
            )}
        </div>
    );
};

export default ManageDestinations;
