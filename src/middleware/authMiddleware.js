// const jwt = require('jsonwebtoken');
// const { BlacklistToken } = require('../models');

// const mustLogin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
    
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'You are not authorized!',
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     console.log("Token dari request:", token);

//     const isBlacklisted = await BlacklistToken.findOne({ where: { token } });
//     if (isBlacklisted) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'Token has been invalidated! Please login again.',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.error("Error Middleware:", error);
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Invalid or expired token!',
//     });
//   }
// };

// const mustAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
    
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'You are not authorized!',
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const isBlacklisted = await BlacklistToken.findOne({ where: { token } });
//     if (isBlacklisted) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'Token has been invalidated! Please login again.',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== 'admin') {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'Access denied! Only admin can access this resource.',
//       });
//     }

//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: 'fail',
//       message: 'Invalid or expired token!',
//     });
//   }
// };

// module.exports = { mustLogin, mustAdmin };


const jwt = require('jsonwebtoken');
const { BlacklistToken } = require('../models');

// Helper untuk memverifikasi token
const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("You are not authorized!");
  }

  const token = authHeader.split(" ")[1];

  // Cek apakah token ada di blacklist
  const isBlacklisted = await BlacklistToken.findOne({ where: { token } });
  if (isBlacklisted) {
    throw new Error("Token has been invalidated! Please login again.");
  }

  // Verifikasi token
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware untuk semua user yang login
const mustLogin = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ status: "fail", message: error.message });
  }
};

// Middleware khusus admin
const mustAdmin = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        status: "fail",
        message: "Access denied! Only admin can access this resource.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ status: "fail", message: error.message });
  }
};

module.exports = { mustLogin, mustAdmin };
