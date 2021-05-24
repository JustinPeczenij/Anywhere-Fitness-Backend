
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Class_Client_Reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('Class_Client_Reservations').insert([
        {class_id: 1, user_id: 2},
        {class_id: 1, user_id: 2}
      ]);
    });
};
