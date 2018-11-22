const mongoose = require('mongoose');
// const Produto = require('app.models.product.js');

const PedidoSchema = mongoose.Schema(
  {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    produtos: {
      item: {
        type: String,
        required: true,
        trim: true
      }
    },
    idSupermercado: {
      type: String,
      required: true,
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
