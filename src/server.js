const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', routes);

app.get('/', (req, res, next) => {
  try {
    return res.send("Welcome to My API");
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  return res.status(404).json({
    status: 'fail',
    message: "not found",
  });
});

app.use((err, req, res) => {
  return res.status(500).json({
    status: 'fail',
    message: "internal server error" + err.message,
    data: null,
  });
});

app.listen(PORT, () => {
  return console.log(`Server berjalan di http://localhost:${PORT}`);
});
