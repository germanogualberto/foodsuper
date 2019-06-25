const mongoose = require('mongoose');
// const Produto = require('app.models.product.js');

const PedidoSchema = mongoose.Schema(
  {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    produtos: [],
    idSupermercado: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      trim: true
    },
    idCliente: {
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


module.exports = () => mongoose.model('Pedido', PedidoSchema);
