const express = require('express');

const router = express.Router();

const emailController = require('../Controller/sendEmailController');

router.post('/create', emailController.createMail);

router.post('/edit', emailController.editMail);

router.get('/getall', emailController.getAll);

router.get('/getbyid', emailController.getEmailById);

router.post('/delete', emailController.deleteSchedule);

module.exports = router;