const express = require('express');

const adminController = require('../controllers/admin');

// const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// router.use(checkAuth);

// router.post('/add-engineer', adminController.addEngineer);

router.post('/add-user', adminController.addUser);

router.get('/users', adminController.getUsers);

router.get('/users/:userId', adminController.getUser);

router.patch('/users/:userId', adminController.updateUser);

router.delete('/users/:userId', adminController.deleteUser);

router.get('/tickets', adminController.getTickets);

router.get('/tickets/pie/repairType', adminController.getRepairTypeValues);

router.get('/tickets/pie/adminstration', adminController.getAdministrationValues);

// router.get('/engineers', adminController.getEngineers);

// router.get('/engineers/:engineerId', adminController.getEngineer);

// router.patch('/engineers/:engineerId', adminController.updateEngineer);

// router.delete('/engineers/:engineerId', adminController.deleteEngineer);

// router.delete(
//   '/delete-appointment/:appointmentId',
//   adminController.deleteAppointment
// );

module.exports = router;
