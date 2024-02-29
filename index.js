// require("dotenv").config();
// const http = require('http')
// const app = require('./src/app');
// const connectDB = require("./src/db/connectDB");
// const server = http.createServer(app)
// const port = process.env.PORT || 5000;

// const main = async () => {
//   await connectDB();
//   server.listen(port, () => {
//     console.log(`Rentify server is running on port ${port}`);
//   });
// }
// main()

// Code given by chatgpt used for debugging [commented after resolved]
require("dotenv").config();
const http = require('http');
const app = require('./src/app');
const connectDB = require("./src/db/connectDB");
const port = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Car Doctor Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

main();

