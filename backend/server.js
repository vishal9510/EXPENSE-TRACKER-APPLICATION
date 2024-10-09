const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());



// Import Routes
const router = require('./routes/authRoutes');
const expenserouter = require('./routes/expenseRoutes');


// Use Routes
app.use('/api/auth', router);
app.use('/api/expense', expenserouter);




// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

