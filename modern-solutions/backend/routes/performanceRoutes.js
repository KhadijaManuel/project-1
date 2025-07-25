const express = require('express');
const router = express.Router();
const { getAllReviews, addReview, deleteReview, updateReview } = require('../controllers/performanceController');


router.get('/', getAllReviews);// GET all reviews in the databse 
router.post('/', addReview);// POST a new review to the database 
router.delete('/:id', deleteReview);// DELETE a review in the database 
router.put('/:id', updateReview);//PUT to update a review in the datbase and site

module.exports = router;
