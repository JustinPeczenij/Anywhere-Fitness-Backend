const db = require('../../data/db-config')

const getAll = () => {
    return db('Classes as C')
        .join('Users as U', 'C.user_id', 'U.user_id')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('C.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')
}

const getById = async (class_id) => {
    const cla = await db('Classes as C')
    .where('C.class_id', class_id)
    .join('Users as U', 'C.user_id', 'U.user_id')
    .join('Roles as R', 'U.role_id', 'R.role_id')
    .select('C.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')
    const formatted = await cla.reduce((acc, cl) => {
            acc = {
              class_id: cl.class_id,
              name: cl.name,
              type: cl.type,
              date: cl.date,
              start_time: cl.start_time,
              duration: cl.duration,
              intensity_level: cl.intensity_level,
              location: cl.location,
              num_registered: cl.num_registered,
              max_class_size: cl.max_class_size,
              instructor: {
                  user_id: cl.user_id,
                  username: cl.username,
                  email: cl.email,
                  role_name: cl.role_name
              }
            }
            return acc
        }, [])
    return formatted
}

const add = async (cl) => {
    await db('Classes').insert(cl)
    const newClass = await db('Classes as C')
        .where('C.name', cl.name)
        .join('Users as U', 'C.user_id', 'U.user_id')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('C.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')
    const formatted = await newClass.reduce((acc, cl) => {
            acc = {
              class_id: cl.class_id,
              name: cl.name,
              type: cl.type,
              date: cl.date,
              start_time: cl.start_time,
              duration: cl.duration,
              intensity_level: cl.intensity_level,
              location: cl.location,
              num_registered: cl.num_registered,
              max_class_size: cl.max_class_size,
              instructor: {
                  user_id: cl.user_id,
                  username: cl.username,
                  email: cl.email,
                  role_name: cl.role_name
              }
            }
            return acc
        }, [])
    return formatted
}



module.exports = {
    getAll,
    getById,
    add
}