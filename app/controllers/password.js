module.exports = (app) => {
  const User = app.models.user;

  const controller = {};

  /**
   * Change password of logged user
   * @param {*} req
   * @param {*} res
   */
  controller.changePassword = (req, res) => {
    const { _id } = req.user;
    User.findOne({ _id })
      .exec()
      .then((user) => {
        if (user.verifyPassword(req.body.oldPassword)) {
          const data = {};
          data.password = user.generateHash(req.body.password);

          User.findOneAndUpdate({ _id }, data, { new: false })
            .lean(true)
            .exec((err) => {
              if (err) {
                console.log(`error: ${err}`);
                return res.status(500).json(err);
              }
              return res.status(200).end();
            });
        } else {
          return res.status(500).end();
        }
      })
      .catch((error) => {
        console.log(`error: ${error}`);
        return res.status(500).json(error);
      });
  };

  return controller;
};
