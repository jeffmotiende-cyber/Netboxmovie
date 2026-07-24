const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const {
  getDashboard,
  getUsers,
  updateUserStatus,
  deleteUser,
  getUserDetails,
  getAnalytics,
  resetUserPassword,
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/reset-password', resetUserPassword);
router.delete('/users/:id', deleteUser);
router.get('/analytics', getAnalytics);

module.exports = router;

