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

    app
    .route('/productt/:_id')
    .get(controller.get2)
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
  
  app
    .route('/productDel/:_id')
    .put(
      permissionUtils.isLoggedIn,
      permissionUtils.roleAuthorization(updateAndDeleteP),
      controller.delete
    );
};
