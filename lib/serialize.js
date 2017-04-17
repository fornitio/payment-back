const serialize = user => ({
              userId: user._id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname
            });
module.exports = serialize;