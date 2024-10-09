const Expense = require('../model/expense.model');

// Create new expense
const addExpense = async (req, res) => {
    const { title, amount, category, date, paymentMethod } = req.body;  // Add paymentMethod
    try {
        const newExpense = new Expense({
            user: req.user.id,
            title,
            amount,
            category,
            date: date || Date.now(),
            paymentMethod  // Save paymentMethod
        });
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all expenses with advanced filtering
const getExpenses = async (req, res) => {
    const { category, minAmount, maxAmount, startDate, endDate, paymentMethod } = req.query;
    try {
        const query = { user: req.user.id };

        // Filtering by category
        if (category) {
            query.category = category;
        }

        // Filtering by amount range
        if (minAmount) {
            query.amount = { $gte: minAmount };
        }
        if (maxAmount) {
            if (!query.amount) {
                query.amount = {};
            }
            query.amount.$lte = maxAmount;
        }

        // Filtering by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate);
            }
            if (endDate) {
                query.date.$lte = new Date(endDate);
            }
        }

        // Filtering by payment method
        if (paymentMethod) {
            query.paymentMethod = paymentMethod;
        }

        const expenses = await Expense.find(query);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get single expense by ID
const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Check if the expense belongs to the user
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(expense);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    const { title, amount, category, date, paymentMethod } = req.body;  // Add paymentMethod
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Check if the expense belongs to the user
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update the fields
        if (title) expense.title = title;
        if (amount) expense.amount = amount;
        if (category) expense.category = category;
        if (date) expense.date = date;
        if (paymentMethod) expense.paymentMethod = paymentMethod;  // Update paymentMethod

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });

        // Check if the expense belongs to the user
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await expense.remove();
        res.json({ msg: 'Expense removed' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
}
