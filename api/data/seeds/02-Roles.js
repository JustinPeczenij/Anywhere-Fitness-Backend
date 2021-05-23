
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('Roles').insert([
        {role_id: 1, role_name: 'INSTRUCTOR'},
        {role_id: 2, role_name: 'CLIENT'},
      ]);
    });
};
