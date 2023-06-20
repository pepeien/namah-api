import { Router } from "express";

import auth from "./auth";
import users from "./users";
import posts from "./posts";
import products from "./products";
import podcasts from "./podcasts";
import courses from "./courses";
import banners from "./banners";
import concepts from "./concetps";
import search from "./search";

const router = Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/posts", posts);
router.use("/products", products);
router.use("/podcasts", podcasts);
router.use("/courses", courses);
router.use("/banners", banners);
router.use("/concepts", concepts);
router.use("/search", search);

export default router;
