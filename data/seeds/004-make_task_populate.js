
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tasks').insert([
        // sprint project task
        {
          name: 'do gitflow on sprint',
          task_status: true,
          project_id: 1,
        },
        {
          name: 'reach mvp and stretch',
          task_status: true,
          project_id: 1,
        },
        {
          name: 'deploy to AWS',
          task_status: false,
          project_id: 1,
        },
        {
          name: 'turn in retro',
          task_status: false,
          project_id: 1,
        },
        {
          name: 'kickback',
          task_status: false,
          project_id: 1,
        },
        // cat project task
        {
          name: 'throw cat out room if he wakes up at 4am',
          task_status: false,
          project_id: 1,
        },
        {
          name: 'give treats opn days he doesnt wake up at 4am',
          task_status: true,
          project_id: 1,
        },
      ]);
    });
};
