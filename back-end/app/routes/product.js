module.exports = (app) => {
  const controller = app.controllers.product;
  const permissionUtils = app.utils.permission;

  const updateAndDeleteP = [permissionUtils.userTypes.SUPERMARKET];

  app
    .route('/product')
    .post(controller.add)
    .get(controller.list);

  app
    .route('/product/:idSupermercado')
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