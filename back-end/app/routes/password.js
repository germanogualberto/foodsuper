module.exports = (app) => {
  const controller = app.controllers.password;
  const permissionUtils = app.utils.permission;

  app
    .route('/changePassword')
    .post(permissionUtils.isLoggedIn, controller.changePassword);
};
