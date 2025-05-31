const express = require('express');
const router = express.Router();
const Newsletter = require("../models/Newsletter");

router.post('/subscribe', async (req, res) => {
    const {email} = req.body;
    if(!email || !email.includes("@")) return res.status(400).json({message: "Invalid email"})

    try {
        const exists = await Newsletter.findOne({ email});
        if (exists) return res.status(409).json({message: "Email already subscribed"});
        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();
        res.status(201).json({message: "Subscription successfully"})
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
    
});

module.exports = router;