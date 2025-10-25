require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Connect DB + Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.log(err));
