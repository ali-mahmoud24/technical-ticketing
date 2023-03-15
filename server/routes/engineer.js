const express = require('express');

const engineerController = require('../controllers/engineer');

// const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// router.use(checkAuth);

router.get('/:engineerId/tickets', engineerController.getTickets);

router.patch('/tickets/:ticketId', engineerController.updateTicketStatus);

module.exports = router;
