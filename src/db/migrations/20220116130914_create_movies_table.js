
exports.up = function(knex) {
    return knex.schema.createTable('movies', (table) => {
      table.increments("movie_id").primary();
      table.string('title').notNullable();
      table.integer('runtime_in_minutes').unsigned().notNullable();
      table.string('rating');
      table.text('description');
      table.string('image_url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('movies');
  }