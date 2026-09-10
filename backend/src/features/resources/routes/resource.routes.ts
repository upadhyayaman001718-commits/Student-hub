import prisma from "../../../lib/prisma";
import { getDownloadUrl } from "../../../services/s3.services";
import { Router } from "express";
import { validate } from "../../../middleware/validate.middleware";
import { authenticateToken } from "../../../middleware/auth.middleware";
import { createResourceScheme, updateResourceScheme } from "../../../validators/resource.schema";
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourceFile,
  getResourceDownload,
} from "../controllers/resource.controller";
import multer from "multer";
import { uploadFileToS3 } from "../../../services/s3.services";

const upload = multer({ storage: multer.memoryStorage(), });

const router = Router();

router.get("/", getResources);

router.get("/:id/file", getResourceFile);

router.get("/:id/download", getResourceDownload);

router.get("/:id", getResourceById);

router.post("/", validate(createResourceScheme),
  createResource);

router.patch("/:id", validate(updateResourceScheme),
  updateResource);

router.delete("/:id", deleteResource);

router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file received",
        });
      }

      console.log("🔥 BODY:", req.body);
      console.log("🔥 SEMESTER:", req.body.semester);
      console.log("🔥 SEMESTER NUMBER:", Number(req.body.semester));

      const result = await uploadFileToS3(req.file);

      const resource = await prisma.resource.create({
        data: {
          title: req.body.title,
          subject: req.body.subject,
          semester: Number(req.body.semester),
          program: req.body.program || null,
          course: req.body.course || null,
          resourceType: req.body.resourceType || null,
          fileName: result.fileName,
          s3Key: result.key,
          fileType: result.fileType,
          userId: Number(req.user?.userId),
        },
      });

      res.status(200).json({
        success: true,
        message: "File uploaded to S3 successfully",
        data: resource,
      });
    } catch (error) {
      console.log("🔥 S3 UPLOAD ERROR:", error);
      next(error);
    }
  }
);



export default router;