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
    },
    profile: {
      type: DataTypes.VIRTUAL,
      get() {
        const profile = eval(this.role+'Profile');
        return profile.findOne({where: {userId: this.id}});
      },

    }
  }, {});
  User.associate = (models) => {
  };

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
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password, user.salt)
    }
  }
  // instance methods

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
  return User;
};