import React, { useState } from "react";
import './NewsletterFrom.css';

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault(); // Prevent default form submission behavior
        setMessage('');

        try {
            const res = await fetch("http://localhost:5000/api/newsletter/subscribe", {
                method : "POST", // Use POST method to send data
                headers: {"content-type": "application/json"}, // Set content type to JSON
                body: JSON.stringify({email})  // Send email in the request body
            });
            const data = await res.json();
            setMessage(data.message);

            if (res.status === 201) return setEmail(''); // Clear email input on successful subscription
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            setMessage("An error occurred while subscribing. Please try again later."); 
        }
    }
    return (<div className="newsletter-form">
        <h3>subscribe to our newsletter</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} // Update email state on input change
                placeholder="Enter your email"
                required
            />
            <button type="submit">Subscribe</button>
            {message && <p className="message">{message}</p>} {/* Display message if exists */}
        </form>
    </div>)
};


export default NewsletterForm;