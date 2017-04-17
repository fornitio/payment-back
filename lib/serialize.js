const serialize = user => ({
              userId: user._id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              account: user.account
            });
module.exports = serialize;