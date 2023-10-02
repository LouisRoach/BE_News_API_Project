const db = require('../connection')

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then((result) =>{
        console.log("in model")
        return result.rows
    })
}