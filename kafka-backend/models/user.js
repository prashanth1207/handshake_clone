'use strict';
const crypto = require('crypto')
var mongoose = require('mongoose');
let StudentProfile = mongoose.model('StudentProfile');
let CompanyProfile = mongoose.model('CompanyProfile');

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    unique: [true,'Email address has to be unique'],
    required: [true,'Email address has to be unique'],
    isEmail: true,
    // validate: {
    //   notNull: {
    //     msg: 'Email address has to be unique'
    //   },
    //   isEmail: {
    //     args: true,
    //     msg: 'Email not in a valid format'
    //   }
    // }
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'Password is required'
    //   }
    // }
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    required: true,
    validate: {
      validator: function(role){
        return ['Student','Company'].includes(role);
      },
      message: 'Has to be a Student or Company'
    }
  }
},
{
  timestamps: true
});

UserSchema.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
};
UserSchema.encryptPassword = (plainText, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

UserSchema.virtual('profile').get(function(){
  const profile = this.role === 'Student' ? StudentProfile : CompanyProfile;
  return profile.findOne({userId: this._id});
});
UserSchema.methods.is_password_valid = function(password){
    return this.password === UserSchema.encryptPassword(password, this.salt);
};

UserSchema.pre('save',function(next){
  if (this.isNew) {
    this.salt = UserSchema.generateSalt();
    this.password = UserSchema.encryptPassword(this.password, this.salt);
  }
  next();
});

UserSchema.post('save', function(error, doc, next) {
  if (error.message === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
    
//   }, {});
//   User.associate = (models) => {
//   };

//   // class methods
//   User.generateSalt = () => {
//     return crypto.randomBytes(16).toString('base64')
//   };
//   User.encryptPassword = (plainText, salt) => {
//     return crypto
//       .createHash('RSA-SHA256')
//       .update(plainText)
//       .update(salt)
//       .digest('hex')
//   }
//   User.findBy = async (queryObject) => {
//     let where_query = {where: queryObject.column};
//     delete queryObject.column;
//     let final_query = Object.assign({},where_query, queryObject);
//     let res = await User.findAll(final_query);
//     return res[0];
//   }

//   User.StudentRole = 'Student';
//   User.CompanyRole = 'Company';

//   // instance methods

//   User.prototype.is_password_valid = function(password){
//       return this.password === User.encryptPassword(password, this.salt);
//   }

//   User.prototype.profile = function(){
//     const profile = eval(this.role+'Profile');
//     return profile.findOne({where: {userId: this.id}});
//   }

//   // u = await User.findOne();u.is_password_valid('abcd')
//   const setSaltAndPassword = user => {
//     if (user.changed('password')) {
//       user.salt = User.generateSalt()
//       user.password = User.encryptPassword(user.password, user.salt)
//     }
//   }
//   User.beforeCreate(setSaltAndPassword)
//   User.beforeUpdate(setSaltAndPassword)
//   return User;
// };