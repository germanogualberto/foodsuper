const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema(
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
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6
    },
    token: {
      type: String,
      trim: true
    },
    address: {
      street: {
        type: String,
        trim: true,
        required: true
      },
      neighborhood: {
        type: String,
        trim: true,
        required: true
      },
      number: {
        type: String,
        trim: true,
        required: true
      },
      zipcode: {
        type: String,
        trim: true,
        required: true
      },
      city: {
        type: String,
        trim: true,
        required: true
      },
      state: {
        type: String,
        trim: true,
        required: true
      }
    }
    // foto
  },
  { discriminatorKey: 'type' }
);

/**
 * Generate hash for password
 * @param {*} password
 * @return {string} password hash
 */
// eslint-disable-next-line func-names
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Verify if password passed is equals of atual user
 * @param {*} password
 * @return {boolean} true if is equals, false otherwise
 */
// eslint-disable-next-line func-names
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = () => mongoose.model('User', UserSchema);
