'use strict';
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    emailId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
      isEmail: true,
      validate: {
        notNull: {
          msg: 'Email address has to be unique'
        },
        isEmail: {
          args: true,
          msg: 'Email not in a valid format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Password is required'
        }
      }
    },
    salt: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Student','Company']],
          msg: 'Has to be a Student or Company'
        }
      }
    }
  }, {});
  User.associate = (models) => {
  };

  // class methods
  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64')
  };
  User.encryptPassword = (plainText, salt) => {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }
  User.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column};
    delete queryObject.column;
    let final_query = Object.assign({},where_query, queryObject);
    let res = await User.findAll(final_query);
    return res[0];
  }

  User.StudentRole = 'Student';
  User.CompanyRole = 'Company';

  // instance methods

  User.prototype.is_password_valid = function(password){
      return this.password === User.encryptPassword(password, this.salt);
  }

  User.prototype.profile = function(){
    const profile = eval(this.role+'Profile');
    return profile.findOne({where: {userId: this.id}});
  }

  // u = await User.findOne();u.is_password_valid('abcd')
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password, user.salt)
    }
  }
  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
  return User;
};