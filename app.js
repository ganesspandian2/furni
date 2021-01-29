require('dotenv').config()

const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')
const authenticationRoutes = require("./routes/authentication")

mongoose.connect(process.env.DB_HOST, 
    {
        useNewUrlParser : true, 
        useCreateIndex : true,
        useUnifiedTopology : true
    }
).then(() => console.log("DB Connected Successfully"));

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

app.use("/api", authenticationRoutes)


app.listen(port, () => console.log(`Example app listening on port port!`))
