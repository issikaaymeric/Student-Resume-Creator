const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    personalInfo: {
        name: String,
        dateOfBirth: String,
        gender: String,
        address: String,
        city: String,
        region: String,
        phone: String,
        email: String
    },
    summary: String,

    education: [
        {
            diploma: String,
            institution: String,
            year: String
        }
    ],

    experiences: [
        {
            jobTitle: String,
            company: String,
            duration: String,
            description: String
        }
    ],

    certificates: [
        {
            name: String,
            year: String
        }
    ],

    languages: [
        {
            language: String,
            level: String
        }
    ],

    activities: [
        {
            activity: String,
            description: String
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Resume", resumeSchema);
