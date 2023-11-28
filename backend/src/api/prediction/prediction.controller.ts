import { Router } from "express";

import { getNextDayPrediction } from "./prediction.service";

const router = Router();

router.get("/:town", getNextDayPrediction);

export default router;
