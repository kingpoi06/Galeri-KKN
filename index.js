const express = require("express");
const cors = require("cors"); 

const app = express();

require('dotenv').config();

// app.use('/static', express.static(join(process.cwd(), "public")))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  // const allowedOrigins = ['http://localhost:5000', 'https://your-netlify-app.netlify.app'];
  const allowedOrigins = ['http://localhost:5000'];

  
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const galeriRouter = require('./routes/galeri-router');
const authRouter = require('./routes/auth-router');

app.use("/api/v1/galeri", galeriRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running....");
});

// app.use((req, res, next) => {
//   const allowedOrigins = ['http://localhost:5000', 'https://your-netlify-app.netlify.app'];

//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   next();
// });