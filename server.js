const mongoose = require("mongoose")
mongoose
.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.cezuy.mongodb.net/bookReview`)
.then(()=>console.log("Connected to DB"))

