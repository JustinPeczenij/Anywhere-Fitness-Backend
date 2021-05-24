const db = require('../../data/db-config')

const findByUsername = (username) => {
    return db('Users as U')
        .where('username', username)
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('U.user_id', 'U.username', 'U.email', 'U.password', 'R.role_name as role')
        .first()
}

const add = async (user) => {
    await db('Users').insert(user)
    return db('Users as U')
        .where('username', user.username)
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('U.user_id', 'U.username', 'U.email', 'R.role_name as role')
        .first()
}

module.exports = {
    findByUsername,
    add
}