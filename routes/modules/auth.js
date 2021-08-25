const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get(
  //passport使用的認證機制Facebook
  '/facebook',
  passport.authenticate('facebook', {
    //向facebook索取的資料(存放在scope)
    scope: ['email', 'public_profile'],
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    //認證成功的導向
    successRedirect: '/',
    //失敗的導向
    failureRedirect: '/users/login',
  })
)

module.exports = router
