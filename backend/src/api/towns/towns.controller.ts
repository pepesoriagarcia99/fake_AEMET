import { Router } from "express";

import cache from "../../services/cache";
import { listTowns } from "./towns.service";

const router = Router();

router.get("/", cache, listTowns);

export default router;
