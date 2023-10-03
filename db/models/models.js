const db = require('../connection')
const {endpoints} = require('../endpoints.json')

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then((result) =>{
       
        return result.rows
    })
}

