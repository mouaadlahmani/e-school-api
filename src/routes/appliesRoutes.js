const express = require('express');
const router = express.Router();
const appliesController = require('../controller/appliesController');

// Add a new application
router.post('/', appliesController.createApply);

// Get all applications
router.get('/', appliesController.getApplies);

// Get applications by type
router.get('/:type', appliesController.getAppliesByType);

// Delete an application
router.delete('/:id', appliesController.removeApply);

// Update read status
router.patch('/:id/read', appliesController.setReadStatus);

module.exports = router;
