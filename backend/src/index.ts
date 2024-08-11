/*
console.log(
  "This is a starter kit for this amazing project. With 💓 By Hemanta & Sameer."
);
*/

// to run use command: npm run dev      -- similar to nodemon --

import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";

// connnections and listneres
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server connected to port & Connected to Database");
    })
  })
  .catch((err) => {
    console.log(err);
  });


