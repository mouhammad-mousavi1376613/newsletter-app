const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    subscribeAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Newsletter', schema);
// This code defines a Mongoose model for a newsletter subscription system.
// It includes an email field that must be unique and validated as a proper email format.
// The subscribeAt field records the date and time when the subscription was made, defaulting to the current date and time.
// The model is exported for use in other parts of the application, such as routes or controllers.