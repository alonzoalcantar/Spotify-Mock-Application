
const express = require('express');
const enusreLoggedIn = require('../../config/enusreLoggedIn');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

const ensureLoggedIn = require('../../config/enusreLoggedIn');

// POST /api/users
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);


module.exports = router;