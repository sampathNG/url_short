const mongoose = require("mongoose")
const url = "mongodb://localhost/url_short"

const connect = async (req,res)=>{
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
          });

          console.log('Connected to database');

    } catch (err) {
        console.error(err)
        res.send({err: err.message})

    }
}

const connection = connect()
module.exports = connection
