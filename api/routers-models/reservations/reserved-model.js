const db = require('../../data/db-config')

const getClassesWithReserved = async () => {
    const classesWithReserved = await db('Class_Client_Reservations as CCR')
        .join('Classes as C', 'CCR.class_id', 'C.class_id')
        .join('Users as U', 'CCR.user_id', 'U.user_id')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('CCR.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')

    const formatted = await classesWithReserved.reduce((acc, cl) => {
        if(!acc.find(cla => cla.class_id === cl.class_id)){
            return acc.concat({
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
                reserved_clients: [
                    {
                        user_id: cl.user_id,
                        username: cl.username,
                        email: cl.email,
                        role_name: cl.role_name
                    }
                ]
            })
        } else {
            const currentClass = acc.find(cla => cla.class_id === cl.class_id)
            currentClass.reserved_clients.push({
                user_id: cl.user_id,
                username: cl.username,
                email: cl.email,
                role_name: cl.role_name
            })
        }
        return acc
    }, [])

    return formatted
}

const getReservationsByClass = async (class_id) => {
    const reservedClass = await db('Class_Client_Reservations as CCR')
        .join('Classes as C', 'CCR.class_id', 'C.class_id')
        .join('Users as U', 'CCR.user_id', 'U.user_id')
        .join('Roles as R', 'U.role_id', 'R.role_id')
        .select('CCR.class_id', 'C.name', 'C.type', 'C.date', 'C.start_time', 'C.duration', 'C.intensity_level',
        'C.location', 'C.num_registered', 'C.max_class_size', 'U.user_id', 'U.username', 'U.email', 'R.role_name')
        .where('CCR.class_id', class_id)

        const formatted = await reservedClass.reduce((acc, cl) => {
            if(acc.length === 0) {
                return acc.concat({
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
                    reserved_clients: [
                        {
                            user_id: cl.user_id,
                            username: cl.username,
                            email: cl.email,
                            role_name: cl.role_name
                        }
                    ]
                })
            } else {
                acc[0].reserved_clients.push({
                    user_id: cl.user_id,
                    username: cl.username,
                    email: cl.email,
                    role_name: cl.role_name
                })
            }
            return acc
        }, [])

        return formatted
}

const addReservation = async (ids) => {
    await db('Class_Client_Reservations').insert(ids)
    return getReservationsByClass(ids.class_id)
}

const updateClassWithNumRegistered = (cl) => {
    return db('Classes').where('class_id', cl.class_id).update({ num_registered: cl.num_registered })
}

module.exports = {
    getClassesWithReserved,
    getReservationsByClass,
    addReservation,
    updateClassWithNumRegistered
}