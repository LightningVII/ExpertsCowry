var User = require('../models/user');
var _ = require('underscore');

exports.save = function(req, res) {
    var id = req.body._id;
    var userObj = req.body;
    var _user;
    console.log("userObj" + userObj);

    if (id !== undefined) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }

            _user = _.extend(user, userObj);
            console.log("extend" + _user);
            _user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }

            });
        })
    } else {
        _user = new User({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        });

        _user.save(function(err, user) {
            if (err) {
                console.log(err);
            }
            res.json(user);
        });
    }
};

exports.signup = function(req, res) {
    var _user = req.body;

    User.findOne({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err)
        }

        if (user) {
            res.json({
                tips: "您已经注册过了"
            });
        } else {
            user = new User(_user)
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                res.json({
                    success: "您已注册成功",
                    dataInfo: user
                });
                //res.redirect('/')
            })
        }
    })
}

// signin
exports.signin = function(req, res) {
    var _user = req.body;
    var name = _user.name;
    var password = _user.password;

    User.findOne({
        name: name
    }, function(err, user) {
        if (err) {
            console.log(err)
        }

        if (!user) {
            //return res.redirect('/signup')
            console.log("找不到您的账号信息, 现在前去注册");
            res.json({
                tips: "找不到您的账号信息，现在前去注册"
            });
            return;
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err)
            }
            console.log(isMatch);
            res.json({
                success: isMatch
            });
            /*            if (isMatch) {
                            req.session.user = user

                            return res.redirect('/')
                        } else {
                            return res.redirect('/signin')
                        }*/
        })
    })
}
