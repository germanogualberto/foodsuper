const passport = require('passport');

module.exports = {
  /**
   * Check if it's logged in.
   */
  isLoggedIn: passport.authenticate('bearer', { session: false }),

  /**
   * Check if logged user has properly role for access a endpoint
   * @param {String[]} roles
   */
  roleAuthorization(roles) {
    return (req, res, next) => {
      if (roles.indexOf(req.user.type) > -1) {
        return next();
      }

      res.status(403).end();
      return next('Unauthorized');
    };
  },

  userTypes: {
    CLIENT: 'Client',
    SUPERMARKET: 'Supermarket'
  }
};
