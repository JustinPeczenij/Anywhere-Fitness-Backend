const db = require('../../data/db-config')

const getAll = () => {
    return db('Users as U')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('U.user_id', 'U.username', 'U.email', 'R.role_name as role')

}

const getInstructors = () => {
    return db('Users as U')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .where('U.role_id', 1)
        .select('U.user_id', 'U.username', 'U.email', 'R.role_name')
}

const getClients = () => {
    return db('Users as U')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .where('U.role_id', 2)
        .select('U.user_id', 'U.username', 'U.email', 'R.role_name')
}

const findById = (user_id) => {
    return db('Users as U')
        .where('user_id', user_id)
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('U.user_id', 'U.username', 'U.email', 'R.role_name as role')
        .first()
}

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

const remove = async (user_id) => {
    const deleted = await findById(user_id)
    await db('Users')
        .where('user_id', user_id)
        .del()
    return deleted 
}

const update = async (user_id, updates) => {
    await db('Users').where('user_id', user_id).update(updates)
    return findById(user_id)    
}

module.exports = {
    getAll,
    getInstructors,
    getClients,
    findById,
    findByUsername,
    add,
    remove,
    update
}