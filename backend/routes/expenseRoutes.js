const express = require('express');
const {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');
const {  protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new expense
router.post('/addExpense', protect, admin, addExpense);

// Get all expenses with advanced filtering
router.get('/getExpenses', protect, getExpenses);

// Get a single expense by ID
router.get('/getExpenseById/:id', protect, getExpenseById);

// Update an expense
router.put('/updateExpense/:id', protect, updateExpense);

// Delete an expense
router.delete('/deleteExpense/:id', protect, deleteExpense);

module.exports = router;
