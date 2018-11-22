module.exports = (app) => {
  const controller = app.controllers.client;
  const permissionUtils = app.utils.permission;

  const updateAndDeleteP = [permissionUtils.userTypes.CLIENT];
  const getByIdP = [
    permissionUtils.userTypes.CLIENT,
    permissionUtils.userTypes.SUPERMARKET
  ];

  app.route('/client').post(controller.add);
  app.route('/clients').get(controller.list);

  app
    .route('/client/:_id')
    .get(
      permissionUtils.isLoggedIn,
      permissionUtils.roleAuthorization(getByIdP),
      controller.get
    )
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
