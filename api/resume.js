// api/resume.js
const mongoose = require('mongoose');

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);

  cachedDb = connection;
  return connection;
}

// Resume Schema
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
  education: [{
    diploma: String,
    institution: String,
    year: String
  }],
  experiences: [{
    jobTitle: String,
    company: String,
    city: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  certificates: [{
    name: String,
    organization: String,
    year: String
  }],
  languages: [{
    language: String,
    level: String
  }],
  activities: [{
    activity: String,
    description: String,
    role: String,
    startDate: String,
    endDate: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

// Main handler function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to database
    await connectToDatabase();

    // POST - Create new resume
    if (req.method === 'POST') {
      console.log('Creating new resume:', req.body);

      const resumeData = req.body;

      // Validate required fields
      if (!resumeData.personalInfo || !resumeData.personalInfo.name) {
        return res.status(400).json({
          success: false,
          message: 'Personal information is required'
        });
      }

      // Create new resume
      const newResume = new Resume(resumeData);
      const savedResume = await newResume.save();

      console.log('Resume saved successfully:', savedResume._id);

      return res.status(201).json({
        success: true,
        message: 'Resume saved successfully',
        resumeId: savedResume._id,
        resume: savedResume
      });
    }

    // GET - Get all resumes or one by ID
    if (req.method === 'GET') {
      const { id } = req.query;

      if (id) {
        // Get single resume by ID
        const resume = await Resume.findById(id);

        if (!resume) {
          return res.status(404).json({
            success: false,
            message: 'Resume not found'
          });
        }

        return res.json({
          success: true,
          resume: resume
        });
      } else {
        // Get all resumes
        const resumes = await Resume.find().sort({ createdAt: -1 });

        return res.json({
          success: true,
          count: resumes.length,
          resumes: resumes
        });
      }
    }

    // DELETE - Delete resume by ID
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Resume ID is required'
        });
      }

      const resume = await Resume.findByIdAndDelete(id);

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }

      return res.json({
        success: true,
        message: 'Resume deleted successfully'
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};