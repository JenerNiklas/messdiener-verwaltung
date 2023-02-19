import {Router} from "express";
import {getAll, getOne, upsert, remove} from "./controller.js";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", upsert);

router.post("/:id", upsert);

router.delete("/:id", remove);

export default router;
