const express = require('express');
const router = express.Router();
const { getAllReviews, addReview } = require('../controllers/performanceController');

// GET all reviews
router.get('/', getAllReviews);

// POST a new review
router.post('/', addReview);

module.exports = router;
