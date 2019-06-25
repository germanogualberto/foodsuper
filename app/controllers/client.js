module.exports = (app) => {
  const Client = app.models.client;

  const controller = {};

  /**
   * List all clients. (Actually, there is no route for this.)
   * @param {*} req
   * @param {*} res
   * @return {Array} clients
   */
  controller.list = (req, res) => {
    Client.find({})
      .sort({ name: 1 })
      .lean(true)
      .exec((error, clients) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(clients);
      });
  };

  /**
   * Return client by _id.
   * @param {*} req
   * @param {*} res
   * @return {Object} client
   */
  controller.get = (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    console.log({ _id });
    console.log(req.params);
    Client.findOne({ _id })
      .lean(true)
      .exec((error, client) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(client);
      });
  };

  /**
   * Add a client with passed properties
   * @param {*} req
   * @param {*} res
   * @return {Object} client
   */
  controller.add = (req, res) => {
    const {
      name, lastName, birthDate, email, password, address
    } = req.body;

    const newClient = new Client();
    newClient.name = name;
    newClient.address = address;
    newClient.lastName = lastName;
    newClient.birthDate = birthDate;
    newClient.email = email;
    newClient.password = newClient.generateHash(password);

    newClient.save((error, client) => {
      if (error) {
        console.log(`error: ${error}`);
        const errorToReturn = {};
        if (error.code === 1100) {
          errorToReturn.message = 'Já existe um cliente com esse email.';
        } else {
          errorToReturn.message =
            'Não foi possível criar cliente. Consulte um desenvolvedor do app.';
        }
        return res.status(500).json(errorToReturn);
      }

      return res.status(200).json(client);
    });
  };

  /**
   * Update client by id
   * @param {*} req
   * @param {*} res
   * @return {Object} client updated
   */
  controller.update = (req, res) => {
    const {
      name, lastName, birthDate, address
    } = req.body;
    const data = {};
    if (name) data.name = name;
    if (lastName) data.lastName = lastName;
    if (birthDate) data.birthDate = birthDate;
    if (address) data.address = address;

    const { _id } = req.params;

    Client.findOneAndUpdate({ _id }, data, { new: true })
      .lean(true)
      .exec((error, client) => {
        if (error) {
          console.log(`error: ${error}`);
          return res.status(500).json(error);
        }
        return res.status(200).json(client);
      });
  };

  /**
   * Delete client by id
   * @param {*} req
   * @param {*} res
   */
  controller.delete = (req, res) => {
    const { _id } = req.params;

    Client.findByIdAndDelete(_id).exec((error) => {
      if (error) {
        console.log(`error: ${error}`);
        return res.status(500).json(error);
      }
    });
  };

  return controller;
};
