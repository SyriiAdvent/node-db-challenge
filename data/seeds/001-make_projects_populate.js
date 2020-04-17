exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('Projects')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('Projects').insert([
				{
					name: 'Sprint Challenge: Database Managment',
					description:
						'a 3 hour test on making a DB Schema then using it in knex, and making all queries to the DB with CRUD operations',
				},
				{
					name: 'Personal portfolio website',
					description: 'A website made with all my skills learned at lambda',
				},
				{
					name: 'Teach Tuna how to shutup and not wake everyone up at 4am',
					description:
						'My cat named Tuna, needs to stop being wide awake at 4am',
				},
			]);
		});
};
