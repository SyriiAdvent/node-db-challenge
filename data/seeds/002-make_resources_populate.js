
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('Resources').insert([
        {
          name: 'Computer'
        },
        {
          name: 'Cat Food'
        },
        {
          name: 'Cat Treats'
        },
        {
          name: 'Car'
        },
        {
          name: 'Microphone'
        },
        {
          name: 'Conference Room'
        },
        {
          name: 'Github'
        },
        {
          name: 'AWS'
        },
        {
          name: 'Alarm Clock'
        },
      ]);
    });
};
