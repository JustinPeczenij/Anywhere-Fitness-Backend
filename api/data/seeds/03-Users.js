
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {username: 'admin', password: 'password', email: 'admin@gmail.com', role_id: 1},
        {username: 'client', password: 'password', email: 'client@gmail.com', role_id: 2},
        {username: 'bababooey', password: 'password', email: 'sheesh@gmail.com', role_id: 2},
      ]);
    });
};
