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
    return queryInterface.bulkInsert('patients', [
        {
            name:"Ahmed Moahmed Ali",
            email:"ahmed.ali@gmail.com",
            mobile_number:"01166666666",
            gender:"male",
            profession:"Manager",
            birth_date: new Date("2000-11-14T10:55:38.000Z"),
            created_at: new Date("2018-11-14T10:55:38.000Z"),
            updated_at:new Date("2018-11-14T10:55:38.000Z"),

          },
        {
            name:"Osama Omar",
            email:"osama.omar@gmail.com",
            mobile_number:"01122222222",
            gender:"male",
            profession:"teacher",
            birth_date:new Date("2000-11-14T10:55:38.000Z"),
            created_at: new Date("2018-11-14T10:55:38.000Z") ,
            updated_at:new Date("2018-11-14T10:55:38.000Z"),
        },
        {
            name:"ahmed ali mohamed ",
            email:"ahmed.ali.mohamed@gmail.com",
            mobile_number:"01155555555",
            gender:"male",
            profession:"manager",
            birth_date:new Date("2000-11-14T10:55:38.000Z"), // 
            created_at: new Date("2018-11-14T10:55:38.000Z") ,
            updated_at:new Date("2018-11-14T10:55:38.000Z"),
        },
        
    ], {});
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
