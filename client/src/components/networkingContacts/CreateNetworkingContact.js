import React, { useState } from 'react';
import axios from 'axios';

function CreateNetworkingContact({ backendUrl, currentUser }) {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [contactNotes, setContactNotes] = useState('');

    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setContactName('');
        setContactEmail('');
        setCompanyName('');
        setPosition('');
        setContactNotes('');
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        // Validate the form data
        if (!contactName) newErrors.contactName = 'Contact name is required.';

        if (Object.keys(newErrors).length > 0) {
            // If there are errors, update the errors state and stop the form submission
            setErrors(newErrors);
            return;
        };

        const contactData = {
            userId: currentUser.id,
            contactName,
            contactEmail,
            companyName,
            position,
            contactNotes
        };

        await axios.post(`${backendUrl}/networkingContacts`, contactData)
            .then(response => {
                // Handle successful create
                setTimeout(resetForm, 1000); // Reset the form after 1 second
            })
            .catch(error => {
                console.error('Error creating networking contact', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Contact Name:
                <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} required />
                {errors.contactName && <div className="error">{errors.contactName}</div>}
            </label>
            <label>
                Contact Email:
                <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </label>
            <label>
                Company Name:
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </label>
            <label>
                Position:
                <input type="text" value={position} onChange={e => setPosition(e.target.value)} />
            </label>
            <label>
                Contact Notes:
                <textarea value={contactNotes} onChange={e => setContactNotes(e.target.value)} />
            </label>
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateNetworkingContact;
