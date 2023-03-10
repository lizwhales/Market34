var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    /*
    groups: [{
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: false,
    }],*/
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: false,
    }],
    /*
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      //required: true,
    },
    favourites: [{
      type: Schema.Types.ObjectId,
      ref: 'Item',
      //required: false,
    }],*/
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt
  .genSalt(12)
  .then((salt) => {
    return bcrypt.hash(user.password, salt);
  })
  .then((hash) => {
    user.password = hash;
    next();
  })
  .catch((err)=> next(err));
});


const User = mongoose.model('User', userSchema);
module.exports = { User };