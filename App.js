const express = require("express");
const dotenv = require("dotenv");
const app = express();


const userRoutes = require("./Routes/userRoutes");
const BookRoutes = require("./Routes/bookRoutes");

dotenv.config({ path: "./.env" }); 
require("./server"); 
app.use(express.json()); 


app.use("/user", userRoutes);
app.use("/book", BookRoutes);



const port =  8000; 
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
