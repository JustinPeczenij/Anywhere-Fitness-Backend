
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {username: 'admin', password: '$2b$08$EB4DmBuQGp2R6aWed7oUU.nOCTDjlAxDzAqYTbSQtrG031Dhgl8zq', email: 'admin@gmail.com', role_id: 1},
        {username: 'client', password: '$2b$08$9clNzNInduH5cbVjb3SQKOgH4A3ZrOgkilEAdYV5k3gWTC5Ka3ZG6', email: 'client@gmail.com', role_id: 2},
      ]);
    });
};
