
exports.up = function(knex) {
  return knex.schema
    .createTable('Projects', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable().index();
      tbl.text('description');
      tbl.boolean('project_status').notNullable().defaultTo(false)
    })

    .createTable('Resources', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable();
    })

    .createTable('Project_Resources', tbl => {
      tbl.increments('id').primary();
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('Projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('Resources.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('resource_amount')
    })

    .createTable('Tasks', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable();
      tbl.boolean('task_status').defaultTo(false)
      tbl.integer('project_id').notNullable()
        .unsigned()
        .notNullable()
        .references('Projects.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    // .createTable('Project_Tasks', tbl => {
    //   tbl.increments('id').primary();
    //   tbl.integer('project_id')
    //     .unsigned()
    //     .notNullable()
    //     .references('Projects.id')
    //     .onDelete('CASCADE')
    //     .onUpdate('CASCADE')
    //   tbl.integer('task_id')
    //     .unsigned()
    //     .notNullable()
    //     .references('Tasks.id')
    //     .onDelete('CASCADE')
    //     .onUpdate('CASCADE')
    //   tbl.boolean('task_status').defaultTo(false)
    // })
};

exports.down = function(knex) {
  return knex.schema
    // .dropTableIfExists('Project_Tasks')
    .dropTableIfExists('Tasks')
    .dropTableIfExists('Project_Resources')
    .dropTableIfExists('Resources')
    .dropTableIfExists('Projects')
};
