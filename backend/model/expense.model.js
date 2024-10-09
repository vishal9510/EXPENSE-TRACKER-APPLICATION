const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['cash', 'credit'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);

