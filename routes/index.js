const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.use(authRouter);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Not found' });
});

module.exports = router;
