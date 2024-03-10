import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateNetworkingContact({ match }) {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [contactNotes, setContactNotes] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

    useEffect(() => {
        const fetchContact = async () => {
            const response = await axios.get(`${backendUrl}/networkingContacts/${match.params.id}`);
            const contact = response.data;
            setContactName(contact.contactName);
            setContactEmail(contact.contactEmail);
            setCompanyName(contact.companyName);
            setPosition(contact.position);
            setContactNotes(contact.contactNotes);
        };
        fetchContact();
    }, [match.params.id, backendUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = {
            contactName,
            contactEmail,
            companyName,
            position,
            contactNotes
        };

        const newErrors = {};

      // Validate the form data
      if (!contactName) newErrors.contactName = 'Contact Name is required.';

      if (Object.keys(newErrors).length > 0) {
        // If there are errors, update the errors state and stop the form submission
        setErrors(newErrors);
        return;
      };

        await axios.put(`${backendUrl}/networkingContacts/${match.params.id}`, contactData)
          .then(response => {
            // Handle successful create
            setIsSubmitted(true);
          })
          .catch(error => {
            console.error('Error creating networking contact', error)
          });
  };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Contact Name:
                <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} required />
                {errors.applicationDate && <div className="error">{errors.applicationDate}</div>}
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
            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateNetworkingContact;