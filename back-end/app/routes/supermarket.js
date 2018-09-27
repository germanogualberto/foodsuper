module.exports = (app) => {
  const controller = app.controllers.supermarket;
  const permissionUtils = app.utils.permission;

  const updateAndDeleteP = [permissionUtils.userTypes.SUPERMARKET];

  app
    .route('/supermarket')
    .post(controller.add)
    .get(controller.list);

  app
    .route('/supermarket/:id')
    .get(controller.get)
    .put(
      permissionUtils.isLoggedIn,
      permissionUtils.roleAuthorization(updateAndDeleteP),
      controller.update
    )
    .delete(
      permissionUtils.isLoggedIn,
      permissionUtils.roleAuthorization(updateAndDeleteP),
      controller.delete
    );
};
