const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
    idSupermercado: {
      type: String,
      required: true,
      trim: true
    },
    token: {
      type: String,
      trim: true
    }
  },
  { discriminatorKey: 'type' }
);


module.exports = () => mongoose.model('Product', ProductSchema);
