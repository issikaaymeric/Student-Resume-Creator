const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// POST - Save new resume
router.post('/', resumeController.saveResume);

// GET - Get resume by ID
router.get('/:id', resumeController.getResume);

// GET - Get all resumes (optional)
router.get('/', resumeController.getAllResumes);

// DELETE - Delete resume (optional)
router.delete('/:id', resumeController.deleteResume);

module.exports = router;