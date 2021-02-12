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
  const users = await userModel.find();
  res.json({ users });
});

/** WishLists */
router.post('/add-wishList/:id', async (req, res) => {
  // let idUser = req.params.id;
  // try {
  //   let newWishList = new wishListModel({
  //     title: req.body.title,
  //     description: req.body.description,
  //     content: req.body.content,
  //     url: req.body.url,
  //     user: idUser,
  //   });
  //   await newWishList.save();
  //   const userById = await userModel.findById(idUser);
  //   userById.wishList.push(newWishList);
  //   await userById.save();
  //   // return res.send(userById);
  //   res.json({ userById });
  // } catch (error) {
  //   res.json({ error });
  // }
});

/** WishList By User */
router.get('/my-articles/:id', async (req, res) => {
  // const { id } = req.params;
  // const wishListByUser = await wishListModel.findById(id).populate('wishLists');
  // res.json(wishListByUser);
  // res.json(myArticles);
});

module.exports = router;
