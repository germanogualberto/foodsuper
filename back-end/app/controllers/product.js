module.exports = (app) => {
  const Product = app.models.product;

  const controller = {};

  /**
   * List all products.
   * @param {*} req
   * @param {*} res
   * @return {Array} products
   */
  controller.list = (req, res) => {
    Product.find({})
      .sort({ name: 1 })
      .lean(true)
      .exec((error, products) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(products);
      });
  };

  /**
   * Return product by _id.
   * @param {*} req
   * @param {*} res
   * @return {Object} product
   */
  controller.get = (req, res) => {
    const { idSupermercado } = req.params;
    Product.find({ idSupermercado })
      .lean(true)
      .exec((error, prod) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(prod);
      });
  };

  /**
   * Add a product with passed properties
   * @param {*} req
   * @param {*} res
   * @return {Object} product
   */
  controller.add = (req, res) => {
    const {
      name,
      price,
      idSupermercado
    } = req.body;

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.idSupermercado = idSupermercado;

    newProduct.save((error, prod) => {
      if (error) {
        console.log(`error: ${error}`);
        const errorToReturn = {};
        if (error.code === 1100) {
          errorToReturn.message = 'Já existe um produto com esse id.';
        } else {
          errorToReturn.message =
            'Não foi possível criar produto.' +
            'Consulte um desenvolvedor do app.';
        }
        return res.status(500).json(errorToReturn);
      }

      return res.status(200).json(prod);
    });
  };

  /**
   * Update product by id
   * @param {*} req
   * @param {*} res
   * @return {Object} product updated
   */
  controller.update = (req, res) => {
    const {
      name,
      price,
      idSupermercado
    } = req.body;
    const data = {};
    if (name) data.name = name;
    if (price) data.price = price;
    if (idSupermercado) data.idSupermercado = idSupermercado;

    const { _id } = req.params;

    Product.findOneAndUpdate({ _id }, data, { new: true })
      .lean(true)
      .exec((error, product) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(product);
      });
  };

  /**
   * Delete product by id
   * @param {*} req
   * @param {*} res
   */
  controller.delete = (req, res) => {
    const { _id } = req.params;

    Product.findOneAndDelete({ _id }).exec((error) => {
      if (error) {
        console.log(`error: ${error}`);
        return res.status(500).json(error);
      }
    });
  };

  return controller;
};
