module.exports = (app) => {
  const controller = app.controllers.pedido;
  const permissionUtils = app.utils.permission;

  const updateAndDeleteP = [permissionUtils.userTypes.SUPERMARKET];

  app
    .route('/pedido')
    .post(controller.add)
    .get(controller.list);

  app
    .route('/pedido/:idSupermercado')
    .get(controller.get1)
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
    .route('/pedidos/:idCliente')
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
};
