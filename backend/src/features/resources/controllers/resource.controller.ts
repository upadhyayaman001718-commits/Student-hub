import { Request, Response } from "express";
import {
  getAllResources,
  getResourceById as findResourceById,
  createResource as createResourceService,
  updateResource as updateResourceService,
  deleteResource as deleteResourceService,
  getResourceFileUrl,
  getResourceDownloadUrl,
} from "../services/resource.service";


export const getResources = async (req: Request, res: Response) => {
  const resources = await getAllResources();

  res.status(200).json({
    success: true,
    message: "Resources fetched successfully",
    data: resources,
  });
};

export const getResourceById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const resource = await findResourceById(id);

  if (!resource) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }



  res.status(200).json({
    success: true,
    message: `Resource ${id} fetched successfully`,
    data: resource,
  });
};

export const createResource = async (req: Request, res: Response) => {
  const { title, subject, semester, s3Key, fileName, fileType, program, course, resourceType, userId } = req.body;

  const resource = await createResourceService(
    title,
    subject,
    semester,
    s3Key,
    fileName,
    fileType,
    program,
    course,
    resourceType,
    userId ? Number(userId) : (req.user?.userId ? Number(req.user.userId) : undefined)
  );

  res.status(201).json({
    success: true,
    message: "Resource created successfully",
    data: resource,
  });
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { title, subject, semester } = req.body;

    const resource = await updateResourceService(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: `Resource ${id} updated successfully`,
      data: resource,
    });
  } catch (error) {
    return error;
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {

    const id = Number(req.params.id);

    const resource = await deleteResourceService(id);

    res.status(200).json({
      success: true,
      message: `Resource ${id} deleted successfully`,
      data: resource,
    });
  } catch (error) {
    return error;
  }
};

export const getResourceFile = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const url = await getResourceFileUrl(id);

    res.status(200).json({
      success: true,
      message: "Resource file URL generated successfully",
      data: {
        url,
      },
    });
  } catch (error) {
    console.log("🔥 FILE URL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate resource file URL",
    });
  }
};

export const getResourceDownload = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    console.log("🔥 DOWNLOAD RESOURCE ID:", id);

    const url = await getResourceDownloadUrl(id);

    res.status(200).json({
      success: true,
      message: "Resource download URL generated successfully",
      data: {
        url,
      },
    });
  } catch (error) {
    console.log("🔥 DOWNLOAD URL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate download URL",
    });
  }
};