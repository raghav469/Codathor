const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const http = require('http');
const socketio = require('socket.io');

// ✅ Initialize Express app first
const app = express();

// ✅ Now it's safe to use `app` here
const server = http.createServer(app);

// Set up Socket.io
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use(cors()); 

// Make io accessible to routes
app.set('io', io);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/competitions', require('./routes/competitionRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));

// Error handling middleware
app.use(errorHandler);

// Optional test route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Start server
const PORT = config.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
