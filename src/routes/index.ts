import { Router } from "express";

// Routes
import namahEndpoint from "./namah";

const router = Router();

router.use("/namah", namahEndpoint);

export default router;
