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
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")


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
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.get('/', function (req, res) {
    res.send('GET request to homepage')
  })

app.get('/developerTeam', (req, res) => {
    res.json({
        "developerTeam" : [
            {
                "name" : "Jeva Vignesh T",
                "role" : "Flutter Developer",
                "tech_stack" : "Flutter",
                "responsibilities" : ["Building Adobe XD UI to view the app", "Building Front end app", "Flutter UI integration with Backend "]
            },
            {
                "name" : "NAVIN GANESH PANDIYAN R K",
                "role" : "Back-End Developer",
                "tech_stack" : "MongoDB, NodeJS, ExpressJS",
                "responsibilities" : ["Built REST-API using NodeJS, ExpressJS and MongoDB", "Deployed MongoDB Atlas on AWS Cloud.", "Deployed Web App on Heroku"]
            }
        ]
    })
})  



app.listen(port, () => console.log(`Example app listening on port port!`))
