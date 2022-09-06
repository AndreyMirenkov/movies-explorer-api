const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { signinValidator, signupValidator } = require('../middlewares/validator');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);

router.post('/signout', (req, res) => {
  res.status(202).clearCookie('jwt').send('cookie cleared');
});

module.exports = router;
