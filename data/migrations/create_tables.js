exports.up = function (knex) {
  return knex.schema //PROJECTS TABLE
    .createTable("projects", (tbl) => {
      tbl.increments("project_id"); //Primary Key
      tbl.string("project_name").notNullable();//Project Name column
      tbl.string("project_description");//Project Description column
      tbl.boolean("project_completed").defaultTo(0);//Project Completed column
    }) //RESOURCES TABLE
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");//Primary Key
      tbl.string("resource_name").notNullable().unique();//Resources Name column
      tbl.string("resource_description");//Resource Description column
    }) //TASKS TABLE
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");//Primary Key
      tbl.string("task_description").notNullable();//Task Description column
      tbl.string("task_notes");//Task Notes column
      tbl.boolean("task_completed").defaultTo(0);//Task Completed column
      tbl.integer("project_id")//Project id column
         .unsigned() // required so that no negative numbers occur
         .references("project_id")
         .inTable("projects")
         .onDelete("CASCADE")
         .onUpdate("CASCADE");
    })
    .createTable("project_resources", tbl => {
      tbl.increments("project_resources_id")//Primary Key
      tbl.integer("project_id")//Project id from Projects Table
         .unsigned() //required so that no negative numbers occur
         .notNullable()
         .references("project_id")
         .inTable("projects")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")
      
      tbl.integer("resources_id")//Resources id from Resources Table
         .unsigned()
         .notNullable()
         .references("resource_id")
         .inTable("resources")
         .onDelete("CASCADE")
         .onUpdate("CASCADE")
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
