'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const models = require(__dirname + '/../../models');
    const User = models.User;
    const StudentProfile = models.StudentProfile;
    const CompanyProfile = models.CompanyProfile;
    return Promise.all([new Promise(async (resolve, reject) => {
      console.log('hello world!')
      let student_user = await User.create({emailId: 'john.doe@gmail.com', password:'john', role:'Student'}).catch(e => console.log(JSON.stringify(e.errors,null,2)));
      let student = await StudentProfile.create({firstName: 'John',lastName: 'Doe', collegeName: 'San Jose Institue of Technology',userId: student_user.id});
      let company_user = await User.create({emailId: 'Google@gmail.com', password:'google', role:'Company'});
      let college = await CompanyProfile.create({name: 'Google',location: 'Paulo Alto', userId: company_user.id});
      resolve();
    })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
