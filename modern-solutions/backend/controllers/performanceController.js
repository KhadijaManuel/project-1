const db = require('../models/db');

// Get all performance reviews
exports.getAllReviews = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT pr.review_id, pr.employee_id, e.first_name, e.last_name,
              pr.review_period, pr.reviewer, pr.score, pr.comments
       FROM performance_reviews pr
       JOIN employees e ON pr.employee_id = e.employee_id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};

// Add a new performance review
exports.addReview = async (req, res) => {
  const { employee_id, review_period, reviewer, score, comments } = req.body;
  try {
    await db.query(
      `INSERT INTO performance_reviews 
        (employee_id, employee_name, review_period, reviewer, score, comments) 
       VALUES (?, (SELECT CONCAT(first_name,' ',last_name) FROM employees WHERE employee_id=?), ?, ?, ?, ?)`,
      [employee_id, employee_id, review_period, reviewer, score, comments]
    );
    res.json({ message: 'Performance review added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding review' });
  }
};

// deleting a review (permanently deletes from DB)
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.query('SELECT * FROM performance_reviews WHERE review_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    await db.query('DELETE FROM performance_reviews WHERE review_id = ?', [id]);
    res.json({ message: 'Performance review permanently deleted.' });
  } catch (err) {
    console.error('deleteReview error:', err);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
};

// Update a performance review
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { review_period, reviewer, score, comments } = req.body;

  try {
    // Check if review exists
    const [existing] = await db.query('SELECT * FROM performance_reviews WHERE review_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Performance review not found.' });
    }

    // Update only provided fields, keep others as they are
    const updatedReview = {
      review_period: review_period ?? existing[0].review_period,
      reviewer: reviewer ?? existing[0].reviewer,
      score: score ?? existing[0].score,
      comments: comments ?? existing[0].comments
    };

    await db.query(
      `UPDATE performance_reviews 
       SET review_period = ?, reviewer = ?, score = ?, comments = ? 
       WHERE review_id = ?`,
      [updatedReview.review_period, updatedReview.reviewer, updatedReview.score, updatedReview.comments, id]
    );

    res.json({ message: 'Performance review updated successfully.' });
  } catch (err) {
    console.error('updateReview error:', err);
    res.status(500).json({ message: 'Server error while updating review' });
  }
};

