exports.up = async (knex) => {
  await knex.schema
    .createTable('Roles', (tbl) => {
      tbl.increments('role_id')
      tbl.string('role_name', 200).notNullable()
    })
    .createTable('Users', (tbl) => {
      tbl.increments('user_id')
      tbl.string('user_username', 200).notNullable().unique()
      tbl.string('user_password', 200).notNullable()
      tbl.string('user_email', 200).notNullable()
      tbl.integer('role_id').unsigned()
      tbl.foreign('role_id')
        .references('Roles.role_id')
    });
  }
  
  // .createTable('classes', (tbl) => {
  //   tbl.increments('')
  //   tbl.string('', 200).notNullable()
  //   tbl.string('', 200).notNullable()
  //   tbl.string('', 320).notNullable()
  // })
exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('Roles')
    .dropTableIfExists('Users')
}
