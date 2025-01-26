const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');

const app = express();
// app.use(cors());

  
  app.use(cors( 
      {
      origin: ["https://demo1-frontend.vercel.app/"], 
    methods: ["GET,POST"],
    credentials:true, 
      allowedHeaders: ["Content-Type, Authorization"],
      }
  ));

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
  res.send("API is working.on vercel!!!!");
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


// const express = require("express");
// const { MongoClient } = require("mongodb");
// const cors = require("cors");

// const app = express();

// // CORS Configuration: Allow requests from your frontend domain
// const corsOptions = {
//   origin: ["https://demo1-frontend.vercel.app"], // Frontend URL
//   methods: ["GET, POST"],          // Allowed methods
  // allowedHeaders: ["Content-Type, Authorization"],
//   credentials:true
// };

// // Use the CORS middleware with the options
// app.use(cors(corsOptions));

// app.use(express.json());

// const DB_URI = "mongodb+srv://babalpreet102:Babal1111@questions.upcav.mongodb.net/?retryWrites=true&w=majority&appName=questions"; // Use environment variable for sensitive data
// const DB_NAME = "questions";
// const COLLECTION_NAME = "questionare";

// let db;

// // MongoDB connection
// MongoClient.connect(DB_URI)
//   .then((client) => {
//     db = client.db(DB_NAME);
//     console.log(`Connected to MongoDB database: ${DB_NAME}`);
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello, Vercel is working!");
// });

// // Fetch questions route with query parameter
// app.get("/questions", async (req, res) => {
//   try {
//     const { query } = req.query || {};
//     const questions = await db
//       .collection(COLLECTION_NAME)
//       .find({ title: { $regex: query || "", $options: "i" } })
//       .limit(20)
//       .toArray();
//     res.json(questions);
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Export the app for Vercel
// module.exports = app;


