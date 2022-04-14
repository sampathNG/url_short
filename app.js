const  express = require('express');
const app = express();
const connection = require('./db/config')
app.use(express.json({extended: false}));

app.use("/",require("./routes/url"))

app.listen(5000,console.log("runing on port 5000"));