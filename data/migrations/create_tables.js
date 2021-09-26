exports.up = function (knex) {
  return knex.schema //PROJECTS TABLE
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.string("project_name").notNullable();
      tbl.string("project_description");
      tbl.boolean("project_completed").defaultTo(0);
    }) //RESOURCES TABLE
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.string("resource_name").notNullable().unique();
      tbl.string("resource_description");
    }) //TASKS TABLE
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.string("task_description").notNullable();
      tbl.string("task_notes");
      tbl.boolean("task_completed").defaultTo(0);
      tbl.integer("project_id")
         .unsigned() // required so that no negative numbers occur
         .references("project_id")
         .inTable("projects")
         .onDelete("RESTRICT")
         .onUpdate("RESTRICT");
    })
    .createTable('project_resources', tbl => {
      tbl.increments('project_resources_id')
      tbl.integer('project_id')
         .unsigned() //required so that no negative numbers occur
         .notNullable()
         .references('project_id')
         .inTable('projects')
         .onDelete('RESTRICT')
         .onUpdate('RESTRICT')
      
      tbl.integer('resource_id')
         .unsigned()
         .notNullable()
         .references('resource_id')
         .inTable('resources')
         .onDelete('RESTRICT')
         .onUpdate('RESTRICT')
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
