const mongoose = require('mongoose');

module.exports = (uri) => {
  mongoose.connect(uri);

  const createClient = async (Model) => {
    try {
      const newClient = new Model();
      newClient.name = 'Client Example';
      newClient.lastName = 'Last';
      newClient.birthDate = new Date('1997-01-01');
      newClient.address = {};
      newClient.email = 'client@email.com';
      newClient.password = newClient.generateHash('eutenhoumviolaorosa');
      await newClient.save();
    } catch (error) {
      console.log('nao foi possivel add cliente');
      // console.log(error);
    }
  };

  const createSupermarket = async (Model) => {
    try {
      const newMarket = new Model();
      newMarket.name = 'Supermarket Example';
      newMarket.address = {};
      newMarket.description = 'Supermercado de exemplo';
      newMarket.operatingHours = [];
      newMarket.deliveryCosts = [];
      newMarket.email = 'supermarket@email.com';
      newMarket.password = newMarket.generateHash('eutenhoumviolaorosa');
      await newMarket.save();
    } catch (error) {
      console.log('nao foi possivel add supermercado');
      // console.log(error);
    }
  };

  const firstUsers = async () => {
    const User = mongoose.model('User');
    const Client = mongoose.model('Client');
    const Supermarket = mongoose.model('Supermarket');
    try {
      const users = await User.find().exec();
      if (!users.length) {
        await createClient(Client);
        await createSupermarket(Supermarket);
        console.log('First users created!');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (process.env.NODE_ENV !== 'test') {
    mongoose.connection.on('connected', () => {
      firstUsers().then(() => {
        console.log(`Mongoose! Connected in ${uri}`);
      });
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`Mongoose! Disconnected from ${uri}`);
    });

    mongoose.connection.on('error', (error) => {
      console.log(`Mongoose! Connection Error: ${error}`);
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose! Disconnected by application termination');
        process.exit(0);
      });
    });
  }
};
