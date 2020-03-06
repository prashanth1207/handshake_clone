'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventRegistration = sequelize.define('EventRegistration', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    studentProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
  }, {});
   // class methods
   EventRegistration.findBy = async (queryObject) => {
    let where_query = {where: queryObject.column}
    delete queryObject.column
    let final_query = Object.assign({},where_query, queryObject)
    let res = await EventRegistration.findAll(final_query)
    return res[0]
  }
  EventRegistration.associate = function(models) {
    EventRegistration.belongsTo(models.Event);
    EventRegistration.belongsTo(models.StudentProfile);
  };
  return EventRegistration;
};