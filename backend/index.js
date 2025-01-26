const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');

const app = express();
// app.use(cors());
const corsOptions = {
    origin: ["https://demo1-frontend.vercel.app/"], // Frontend URL
    methods: ["GET,POST"], // Specify allowed methods if needed
    credentials:true // Specify allowed headers if needed
  };
  
  app.use(cors(corsOptions));

app.use(express.json());

const PORT_REST = 5000; 

const DB_URI = "mongodb+srv://babalpreet102:Babal1111@questions.upcav.mongodb.net/?retryWrites=true&w=majority&appName=questions";
const DB_NAME = "questions"; 
const COLLECTION_NAME = "questionare"; 

let db;
MongoClient.connect(DB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.get("/", (req, res) => {
  res.send("API is working.on vercel!");
});


app.get("/questions", async (req, res) => {
  try {
    const { query } = req.query;
    const questions = await db
      .collection(COLLECTION_NAME)
      .find({ title: { $regex: query, $options: "i" } })
      .toArray();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT_REST, () => {
  console.log(`Server running on port ${PORT_REST}`);
});


