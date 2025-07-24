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
