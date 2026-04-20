import  express  from "express";
import cors from "cors";
import authRouter from "./routers/auth.router";
import cookieParser from "cookie-parser";
import { corsOptions } from "./configs/cors.config";
import menusRoute from "./routers/menus.router";
import categoriesRouter from "./routers/categories.route";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/menus', menusRoute)
app.use('/api/categories', categoriesRouter)

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(error)
  res.status(error?.expose? error?.statusCode: 500).json({
    success : false,
    massage: error?.expose? error?.message: 'something went wrong',
    data: {},
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});