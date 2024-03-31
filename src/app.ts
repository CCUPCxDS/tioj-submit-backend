import express from "express";
import cors from 'cors';
import  router  from "./routes/router";

const app : express.Application = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("The server is working!");
});

// load router

for (const route of router){
  app.use(route.getPrefix(), route.getRouter());
}

app.listen(port, () => {
  console.log(`server is listening on ${port} !!!`);
});