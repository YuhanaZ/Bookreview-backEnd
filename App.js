const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")

const userRoutes = require("./Routes/userRoutes");
const BookRoutes = require("./Routes/bookRoutes");
// const commentRoutes = require("./Routes/commentRoutes");

dotenv.config({ path: "./.env" }); 
require("./server"); 
app.use(express.json()); 
app.use(express.static("images"));
app.use(cors());


app.use("/user", userRoutes);
app.use("/book", BookRoutes);
// app.use("/comment", commentRoutes);




const port =  8000; 
app.listen(port, () => {
  console.log(`listening on port ${port}`);
  
});
