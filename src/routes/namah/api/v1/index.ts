import { Router } from "express";

import auth from "./auth";
import banners from "./banners";
import concepts from "./concetps";
import courses from "./courses";
import podcasts from "./podcasts";
import posts from "./posts";
import products from "./products";
import search from "./search";
import users from "./users";

const router = Router();

router.use("/auth", auth);
router.use("/posts", posts);
router.use("/products", products);
router.use("/podcasts", podcasts);
router.use("/courses", courses);
router.use("/banners", banners);
router.use("/concepts", concepts);
router.use("/search", search);
router.use("/users", users);

export default router;
