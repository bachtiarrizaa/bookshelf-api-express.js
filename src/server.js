const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes'); // Import routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Gunakan routes yang sudah dipisahkan
app.use('/', bookRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the Book API',
  });
});

// Middleware untuk menangani error 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
});

// Middleware untuk menangani error 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
