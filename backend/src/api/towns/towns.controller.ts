import { Router } from "express";

import cache from "../../services/cache";
import { listTowns } from "./towns.service";

const router = Router();

// /**
//  * @api {get} /user/data/files User file list
//  * @apiName UserFiles
//  * @apiGroup User
//  * @apiPermission User
//  * @apiHeader  {String} Authorization User token.
//  * @apiSuccess {Object} return list of user files.
//  * @apiError (500) ServerError Swift client error, Swift response status code 4XX or 5XX.
//  */
router.get("/", cache, listTowns);

// router.get("/:id", getOneTown);

export default router;
