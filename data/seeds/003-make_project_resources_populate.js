exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('Project_Resources')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('Project_Resources').insert([
				// sprint porject
				{
					project_id: 1,
					resource_id: 1,
					resource_amount: 1,
				},
				{
					project_id: 1,
					resource_id: 7,
					resource_amount: 1,
				},
				{
					project_id: 1,
					resource_id: 8,
					resource_amount: 1,
				},
				{
					project_id: 1,
					resource_id: 9,
					resource_amount: 1,
				},
				// portfolio project
				{
					project_id: 2,
					resource_id: 1,
					resource_amount: 1,
				},
				{
					project_id: 2,
					resource_id: 7,
					resource_amount: 1,
				},
				{
					project_id: 2,
					resource_id: 8,
					resource_amount: 1,
				},
				{
					project_id: 2,
					resource_id: 9,
					resource_amount: 1,
				},
				// cat project
				{
					project_id: 3,
					resource_id: 2,
					resource_amount: 1,
				},
				{
					project_id: 3,
					resource_id: 3,
					resource_amount: 1,
				},
				{
					project_id: 3,
					resource_id: 9,
					resource_amount: 1,
				},
			]);
		});
};
