'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
      },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
      },
    time: {
      type: DataTypes.DATE,
      allowNull: false
      },
    readableTime:{
      type: DataTypes.VIRTUAL,
      get: function(){
        return  new Date(this.time).toLocaleString('en-US', { 
          dateStyle: 'full',
        })
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
      },
    eligibility: {
      type: DataTypes.STRING,
      allowNull: false
},    }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.CompanyProfile,{as:'companyProfile'})
  };
  return Event;
};