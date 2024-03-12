import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NetworkingContactsList({ backendUrl, currentUser }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (currentUser !== null) {
            const fetchContacts = async () => {
                const response = await axios.get(`${backendUrl}/networkingContacts/user/${currentUser.id}`);
                setContacts(response.data);
            };
            fetchContacts();
        }
    }, [currentUser, backendUrl]);

    return (
        <ul>
            {contacts.map(contact => (
                <li key={contact._id}>
                    <h2>{contact.contactName}</h2>
                    <p>Email: {contact.contactEmail}</p>
                    <p>Company: {contact.companyName}</p>
                    <p>Position: {contact.position}</p>
                    <p>Notes: {contact.contactNotes}</p>
                </li>
            ))}
        </ul>
    );
}

export default NetworkingContactsList;
