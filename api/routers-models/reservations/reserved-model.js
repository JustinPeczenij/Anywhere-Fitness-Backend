const db = require('../../data/db-config')

const getReservationsByClass = async (class_id) => {
    const reservedClass = await db('Class_Client_Reservations as CCR')
        .join('Classes as C', 'CCR.class_id', 'C.class_id')
        .join('Users as U', 'CCR.user_id', 'U.user_id')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('CCR.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')
        .where('CCR.class_id', class_id)

        const formatted = await reservedClass.reduce((acc, cl) => {
            return acc.concat({
                  user_id: cl.user_id,
                  username: cl.username,
                  email: cl.email,
                  role_name: cl.role_name
            })
        }, [])

        return formatted
}

module.exports = {
    getReservationsByClass
}