require('dotenv').config()

const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')
const authenticationRoutes = require("./routes/authentication")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")

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

app.use("/api", authenticationRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);


app.listen(port, () => console.log(`Example app listening on port port!`))
