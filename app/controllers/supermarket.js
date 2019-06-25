module.exports = (app) => {
  const Supermarket = app.models.supermarket;

  const controller = {};

  /**
   * List all supermarkets.
   * @param {*} req
   * @param {*} res
   * @return {Array} supermarkets
   */
  controller.list = (req, res) => {
    Supermarket.find({})
      .sort({ name: 1 })
      .lean(true)
      .exec((error, markets) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(markets);
      });
  };

  /**
   * Return supermarket by _id.
   * @param {*} req
   * @param {*} res
   * @return {Object} supermarket
   */
  controller.get = (req, res) => {
    const { _id } = req.params;
    Supermarket.findOne({ _id })
      .lean(true)
      .exec((error, market) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(market);
      });
  };

  /**
   * Add a supermarket with passed properties
   * @param {*} req
   * @param {*} res
   * @return {Object} supermarket
   */
  controller.add = (req, res) => {
    const {
      name,
      email,
      password,
      address,
      description,
      operatingHours,
      deliveryCosts
    } = req.body;

    const newMarket = new Supermarket();
    newMarket.name = name;
    newMarket.address = address;
    newMarket.description = description;
    newMarket.operatingHours = operatingHours;
    newMarket.deliveryCosts = deliveryCosts;
    newMarket.email = email;
    newMarket.password = newMarket.generateHash(password);

    newMarket.save((error, market) => {
      if (error) {
        console.log(`error: ${error}`);
        const errorToReturn = {};
        if (error.code === 1100) {
          errorToReturn.message = 'Já existe um supermercado com esse email.';
        } else {
          errorToReturn.message =
            'Não foi possível criar supermercado.' +
            'Consulte um desenvolvedor do app.';
        }
        return res.status(500).json(errorToReturn);
      }

      return res.status(200).json(market);
    });
  };

  /**
   * Update supermarket by id
   * @param {*} req
   * @param {*} res
   * @return {Object} supermarket updated
   */
  controller.update = (req, res) => {
    const {
      name,
      address,
      description,
      operatingHours,
      deliveryCosts
    } = req.body;
    const data = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (operatingHours) data.operatingHours = operatingHours;
    if (address) data.address = address;
    if (deliveryCosts) data.deliveryCosts = deliveryCosts;

    const { _id } = req.params;

    Supermarket.findOneAndUpdate({ _id }, data, { new: true })
      .lean(true)
      .exec((error, supermarket) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(supermarket);
      });
  };

  /**
   * Delete supermarket by id
   * @param {*} req
   * @param {*} res
   */
  controller.delete = (req, res) => {
    const { _id } = req.params;

    Supermarket.findByIdAndDelete(_id).exec((error) => {
      if (error) {
        console.log(`error: ${error}`);
        return res.status(500).json(error);
      }
    });
  };

  return controller;
};
