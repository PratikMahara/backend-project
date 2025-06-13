import { Router } from "express";
import uploadVideo from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos,getVideoById ,streamVideo} from "../controllers/video.controller.js";
const router = Router();

router.post(
  "/upload",
 verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  uploadVideo
);
router.get("/videoss",getAllVideos);
router.route("/:id").get(getVideoById);
router.route("/stream").get(streamVideo)
export default router;
