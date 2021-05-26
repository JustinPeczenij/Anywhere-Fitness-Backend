exports.up = async (knex) => {
  await knex.schema
    .createTable('Roles', (tbl) => {
      tbl.increments('role_id')
      tbl.string('role_name', 200).notNullable()
    })
    .createTable('Users', (tbl) => {
      tbl.increments('user_id')
      tbl.string('username', 200).notNullable().unique()
      tbl.string('password', 200).notNullable()
      tbl.string('email', 200).notNullable()
      tbl.integer('role_id').unsigned().notNullable()
      tbl.foreign('role_id').references('Roles.role_id')
    })
    .createTable('Classes', (tbl) => {
      tbl.increments('class_id')
      tbl.string('name', 200).notNullable()
      tbl.string('type', 200).notNullable()
      tbl.string('date', 320).notNullable()
      tbl.string('start_time', 320).notNullable()
      tbl.string('duration', 320).notNullable()
      tbl.string('intensity_level', 320).notNullable()
      tbl.string('location', 320).notNullable()
      tbl.string('num_registered', 320).notNullable()
      tbl.string('max_class_size', 320).notNullable()
      tbl.integer('user_id').unsigned().notNullable()
      tbl.foreign('user_id').references('Users.user_id')
        .onDelete("CASCADE")
    })
    .createTable('Class_Client_Reservations', (tbl) => {
      tbl.integer('class_id').unsigned().notNullable()
      tbl.foreign('class_id').references('Classes.class_id')
      tbl.integer('user_id').unsigned().notNullable()
      tbl.foreign('user_id').references('Users.user_id')
    })
  }
  
exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('Class_Client_Reservations')
    .dropTableIfExists('Classes')
    .dropTableIfExists('Users')
    .dropTableIfExists('Roles')
}
