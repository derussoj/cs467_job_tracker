import React from 'react';
import axios from 'axios';

function DeleteNetworkingContact({ match }) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

    const handleDelete = async () => {
        await axios.delete(`${backendUrl}/networkingContacts/${match.params.id}`);
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
}

export default DeleteNetworkingContact;