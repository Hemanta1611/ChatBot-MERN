/*
console.log(
  "This is a starter kit for this amazing project. With 💓 By Hemanta & Sameer."
);
*/
// to run use command: npm run dev      -- similar to nodemon --
import express from 'express';
const app = express();
// middlewares
app.use(express.json());
// connnections and listneres
app.listen(5000, () => {
    console.log("server connected to port 5000");
});
//# sourceMappingURL=index.js.map