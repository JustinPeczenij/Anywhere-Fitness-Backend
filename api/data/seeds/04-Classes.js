
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('Classes').insert([
        {name: "Yoga with Admin", type: "Yoga", date: "Monday, November 30, 2021", start_time: "6:00 PM", duration: "90 minutes", intensity_level: "Intermediate", location: "Zoom", num_registered: 0, max_class_size: 50, user_id: 1},
      ]);
    });
};
