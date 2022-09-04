const router = require('express').Router();
const {
  infoUser, patchProfile,
} = require('../controllers/users');
const { patchProfileValidator } = require('../middlewares/validator');

router.get('/me', infoUser);
router.patch('/me', patchProfileValidator, patchProfile);

module.exports = router;
