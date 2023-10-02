const  {selectAllTopics}  = require("../models/topics_model")


exports.getAllTopics = (req,res) => {
    console.log("in controller")
    console.log(selectAllTopics, "controller")
    selectAllTopics().then((topics)=> {
        res.status(200).send({topics})
    })
}