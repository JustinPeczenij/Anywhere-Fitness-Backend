const db = require('../../data/db-config')

const getAll = () => {
    return db('Classes')
}

const getById = (class_id) => {
    return db('Classes').where('class_id', class_id).first()
}



module.exports = {
    getAll,
    getById
}