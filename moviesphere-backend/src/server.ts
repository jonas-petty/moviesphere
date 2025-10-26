import "dotenv/config";
import express from "express";
import cors from "cors";
import MoviesRouter from "./routes/movies.routes.js";
import favoriteRouter from "./routes/favorites.routes.js";
import shareRouter from "./routes/share.routes.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/movies", MoviesRouter);
app.use("/favorites", favoriteRouter);
app.use("/share", shareRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
