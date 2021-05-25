const Classes = require('./classes-model')

const checkClassId = async (req, res, next) => {
    try {
        const classById = await Classes.getById(req.params.id)
        if(classById.length === 0) {
            next({ status: 404, message: `can't find a class with id ${req.params.id}`})
        } else {
            req.classById = classById
            next()
        }
    } catch(err) {
        next(err)
    }
}

const checkBody = (req, res, next) => {
    if(!req.body.name) next({ status: 422, message: 'class name is required - "name"' })
    if(!req.body.type) next({ status: 422, message: 'class type is required - "type"' })
    if(!req.body.date) next({ status: 422, message: 'class date is required - "date"' })
    if(!req.body.start_time) next({ status: 422, message: 'class start_time is required - "start_time"' })
    if(!req.body.duration) next({ status: 422, message: 'class duration is required - "duration"' })
    if(!req.body.intensity_level) next({ status: 422, message: 'class intensity level is required - "intensity_level"' })
    if(!req.body.location) next({ status: 422, message: 'class location is required - "location"' })
    if(!req.body.max_class_size) next({ status: 422, message: 'class max class size is required - "max_class_size"' })
    if(!req.body.user_id) next({ status: 422, message: 'class instructor is required - "user_id" is all you need' })
    if(!req.body.num_registered) {
        if(!req.body.user_id) next({ status: 422 })
        else {
            req.newClass = {
                ...req.body,
                num_registered: 0
            }
            next()
        }
    }
    else {
        req.newClass = req.body
        next()
    }
}

module.exports = {
    checkClassId,
    checkBody
}