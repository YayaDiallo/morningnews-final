const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

const userModel = require('../models/users');

router.post('/sign-up', async function (req, res, next) {
  const cost = 10;
  const hashedPassword = bcrypt.hashSync(req.body.passwordFromFront, cost);

  let error = [];
  let result = false;
  let saveUser = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push('utilisateur déjà présent');
  }

  if (
    req.body.usernameFromFront == '' ||
    req.body.emailFromFront == '' ||
    req.body.passwordFromFront == ''
  ) {
    error.push('champs vides');
  }

  let token = '';
  if (error.length == 0) {
    let newUser = new userModel({
      wishList: [],
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hashedPassword,
      token: uid2(32),
    });

    const saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, token, error });
});

router.post('/sign-in', async function (req, res, next) {
  let result = false;
  let user = null;
  let error = [];

  if (req.body.emailFromFront == '' || req.body.passwordFromFront == '') {
    error.push('champs vides');
  }

  let tokenSignIn = '';
  if (error.length == 0) {
    const user = await userModel.findOne({ email: req.body.emailFromFront });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        tokenSignIn = user.token;
        result = true;
      } else {
        result = false;
        error.push('Invalid password');
      }
    } else {
      error.push('email ou mot de passe incorrect');
    }
  }
  res.json({ result, user, tokenSignIn, error });
});

/** Find User List */
router.get('/user-list', async (req, res) => {
  const users = await userModel.findById(req.params.id);
  res.json({ users });
});

/** WishLists */
router.post('/add-wishList/:token', async (req, res) => {
  // 1. Chercher le user en fonction du token
  const tokenUser = req.params.token;
  const user = await userModel.findOne({ token: tokenUser });

  // 2. Pusher l'article dans le sous document wishList
  user.wishList.push({
    title: req.body.titleFromFront,
    description: req.body.descriptionFromFront,
    content: req.body.contentFromFront,
    url: req.body.urlFromFront,
  });

  // 3. Enregistrer le user avec sa wishList
  const saveUserWishList = await user.save();
  res.json({ saveUserWishList });
});

// Delete Wishlist
router.delete('/delete-wishList/:token/:idArticle', async (req, res) => {
  const tokenUser = req.params.token;
  const user = await userModel.findOne({ token: tokenUser });
  const wishListUser = user.wishList;

  const removedwishList = await wishListUser.remove({
    _id: req.params.idArticle,
  });
  await user.save();

  res.json({ removedwishList });
});

/** Get WishList By User */
router.get('/wishList/:token', async (req, res) => {
  const tokenUser = req.params.token;
  const user = await userModel.findOne({ token: tokenUser });
  const wishListUser = user.wishList;

  res.json({ wishListUser });
});

module.exports = router;
