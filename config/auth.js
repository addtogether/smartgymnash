module.exports = {
  
  // isAuth Can be placed at any endpoint to allow only
  // Authenticated users to visit that page
   isAuth: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    },
};