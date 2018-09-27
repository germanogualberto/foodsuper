const mongoose = require('mongoose');

const SupermarketSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  deliveryCosts: [
    {
      neighborhood: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  operatingHours: [{ type: String }]
  // formas de pagamento?
  // tipo de comida
});

module.exports = () =>
  mongoose.model('User').discriminator('Supermarket', SupermarketSchema);
