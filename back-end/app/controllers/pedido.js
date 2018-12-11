module.exports = (app) => {
  const Pedido = app.models.pedido;

  const controller = {};

  /**
   * List all pedidos.
   * @param {*} req
   * @param {*} res
   * @return {Array} pedidos
   */
  controller.list = (req, res) => {
    Pedido.find({})
      .sort({ name: 1 })
      .lean(true)
      .exec((error, pedidos) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(pedidos);
      });
  };

  /**
   * Return pedido by idSupermercado.
   * @param {*} req
   * @param {*} res
   * @return {Object} pedido
   */
  controller.get1 = (req, res) => {
    const { idSupermercado } = req.params;
    Pedido.find({ idSupermercado })
      .lean(true)
      .exec((error, ped) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(ped);
      });
  };

  /**
   * Return pedido by idCliente.
   * @param {*} req
   * @param {*} res
   * @return {Object} pedido
   */
  controller.get2 = (req, res) => {
    const { idCliente } = req.params;
    Pedido.find({ idCliente })
      .lean(true)
      .exec((error, ped) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(ped);
      });
  };

  /**
   * Return pedido by _id.
   * @param {*} req
   * @param {*} res
   * @return {Object} pedido
   */
  controller.get3 = (req, res) => {
    const { _id } = req.params;
    Pedido.find({ _id })
      .lean(true)
      .exec((error, ped) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(ped);
      });
  };


  /**
   * Add a pedido with passed properties
   * @param {*} req
   * @param {*} res
   * @return {Object} pedido
   */
  controller.add = (req, res) => {
    const {
      produtos,
      idCliente,
      idSupermercado,
    } = req.body;

    const newPedido = new Pedido();
    newPedido.produtos = produtos;
    newPedido.idCliente = idCliente;
    newPedido.idSupermercado = idSupermercado;
    newPedido.status = "new";

    newPedido.save((error, ped) => {
      if (error) {
        console.log(`error: ${error}`);
        const errorToReturn = {};
        if (error.code === 1100) {
          errorToReturn.message = 'Já existe um pedido com esse id.';
        } else {
          errorToReturn.message =
            'Não foi possível criar pedido.' +
            'Consulte um desenvolvedor do app.';
        }
        return res.status(500).json(errorToReturn);
      }

      return res.status(200).json(ped);
    });
  };

  /**
   * Update pedido by id
   * @param {*} req
   * @param {*} res
   * @return {Object} product updated
   */
  controller.update = (req, res) => {
    const {
      idSupermercado,
      idCliente,
      status
    } = req.body;
    const data = {};
    if (idCliente) data.idCliente = idCliente;
    if (_id) data._id = _id;
    if (idSupermercado) data.idSupermercado = idSupermercado;
    if(status) data.status = status;

    const { _id } = req.params;

    Product.findOneAndUpdate({ _id }, data, { new: true })
      .lean(true)
      .exec((error, ped) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(ped);
      });
  };

  /**
   * Delete pedido by idSupermercado
   * @param {*} req
   * @param {*} res
   */
  controller.delete = (req, res) => {
    const { idSupermercado } = req.params;

    Product.findByIdAndDelete({ idSupermercado }).exec((error) => {
      if (error) {
        console.log(`error: ${error}`);
        return res.status(500).json(error);
      }
    });
  };

  return controller;
};
