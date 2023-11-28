import { Router } from "express";
import towns from "./towns/towns.controller";
import prediction from "./prediction/prediction.controller";

const router = Router();

router.use("/towns", towns);
router.use("/prediction", prediction);

export default router;
