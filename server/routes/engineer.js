const express = require('express');

const engineerController = require('../controllers/engineer');

const router = express.Router();

router.get('/:engineerId/tickets', engineerController.getTickets);

router.patch('/tickets/:ticketId', engineerController.updateTicketStatus);

module.exports = router;
