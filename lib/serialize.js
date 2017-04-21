const serialize = user => ({
              userid: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname
            });
module.exports = serialize;