// resumeController.js - Updated to match your schema

const Resume = require('../models/Resume');

// Save new resume
exports.saveResume = async (req, res) => {
  try {
    console.log('=== SAVE RESUME REQUEST ===');
    console.log('Received data:', JSON.stringify(req.body, null, 2));
    
    const resumeData = req.body;
    
    // Validate required fields
    if (!resumeData.personalInfo || !resumeData.personalInfo.name) {
      console.error('Validation failed: Missing personal info');
      return res.status(400).json({
        success: false,
        message: 'Personal information is required'
      });
    }
    
    // Create new resume document
    const newResume = new Resume({
      personalInfo: {
        name: resumeData.personalInfo.name,
        dateOfBirth: resumeData.personalInfo.dateOfBirth,
        gender: resumeData.personalInfo.gender,
        address: resumeData.personalInfo.address,
        city: resumeData.personalInfo.city,
        region: resumeData.personalInfo.region,
        phone: resumeData.personalInfo.phone,
        email: resumeData.personalInfo.email
      },
      summary: resumeData.summary || '',
      education: resumeData.education || [],
      experiences: resumeData.experiences || [],
      certificates: resumeData.certificates || [],
      languages: resumeData.languages || [],
      activities: resumeData.activities || []
    });
    
    console.log('Attempting to save resume...');
    const savedResume = await newResume.save();
    console.log('Resume saved successfully!');
    console.log('Resume ID:', savedResume._id);
    
    res.status(201).json({
      success: true,
      message: 'Resume saved successfully',
      resumeId: savedResume._id,
      resume: savedResume
    });
    
  } catch (error) {
    console.error('=== ERROR SAVING RESUME ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error saving resume to database',
      error: error.message,
      details: error.toString()
    });
  }
};

// Get resume by ID
exports.getResume = async (req, res) => {
  try {
    console.log('=== GET RESUME REQUEST ===');
    console.log('Resume ID:', req.params.id);
    
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      console.log('Resume not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Resume not found' 
      });
    }
    
    console.log('Resume found:', resume._id);
    
    res.json({ 
      success: true, 
      resume: resume 
    });
    
  } catch (error) {
    console.error('=== ERROR FETCHING RESUME ===');
    console.error('Error:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching resume',
      error: error.message 
    });
  }
};

// Get all resumes (optional - for admin/listing)
exports.getAllResumes = async (req, res) => {
  try {
    console.log('=== GET ALL RESUMES REQUEST ===');
    
    const resumes = await Resume.find().sort({ createdAt: -1 });
    
    console.log(`Found ${resumes.length} resumes`);
    
    res.json({
      success: true,
      count: resumes.length,
      resumes: resumes
    });
    
  } catch (error) {
    console.error('=== ERROR FETCHING RESUMES ===');
    console.error('Error:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes',
      error: error.message
    });
  }
};

// Delete resume (optional)
exports.deleteResume = async (req, res) => {
  try {
    console.log('=== DELETE RESUME REQUEST ===');
    console.log('Resume ID:', req.params.id);
    
    const resume = await Resume.findByIdAndDelete(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    console.log('Resume deleted successfully');
    
    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
    
  } catch (error) {
    console.error('=== ERROR DELETING RESUME ===');
    console.error('Error:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: error.message
    });
  }
};

module.exports = exports;