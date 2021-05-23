
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {user_username: 'admin', user_password: 'password', user_email: 'admin@gmail.com', role_id: 1},
        {user_username: 'client', user_password: 'password', user_email: 'client@gmail.com', role_id: 2},
        {user_username: 'bababooey', user_password: 'password', user_email: 'sheesh@gmail.com', role_id: 2},
        {user_username: 'bababooey', user_password: 'password', user_email: 'sheesh@gmail.com', role_id: 2},
      ]);
    });
};
