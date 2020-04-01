'use strict';

var mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    studentProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model.EventRegistration || mongoose.model('EventRegistration', EventRegistrationSchema);

//    // class methods
//    EventRegistration.findBy = async (queryObject) => {
//     let where_query = {where: queryObject.column}
//     delete queryObject.column
//     let final_query = Object.assign({},where_query, queryObject)
//     let res = await EventRegistration.findAll(final_query)
//     return res[0]
//   }
//   EventRegistration.associate = function(models) {
//     EventRegistration.belongsTo(models.Event);
//     EventRegistration.belongsTo(models.StudentProfile);
//   };
//   return EventRegistration;
// };