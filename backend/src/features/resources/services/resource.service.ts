import prisma from "../../../lib/prisma";
import {
  getFileUrlFromS3,
  getDownloadUrl,
} from "../../../services/s3.services";

export const createResource = async (
  title: string,
  subject: string,
  semester: number,
  s3Key: string,
  fileName?: string,
  fileType?: string,
  program?: string,
  course?: string,
  resourceType?: string,
  userId?: number
) => {
  return await prisma.resource.create({
    data: {
      title,
      subject,
      semester,
      s3Key,
      fileName,
      fileType,
      program,
      course,
      resourceType,
      userId: userId!,
    },
  });
};


export const getAllResources = async () => {

  const resources = await prisma.resource.findMany();

  return resources;
};

export const getResourceById = async (id: number) => {
  return await prisma.resource.findUnique({
    where: {
      id: id,
    },
  });
};

export const getResourceFileUrl = async (id: number) => {
  const resource = await prisma.resource.findUnique({
    where: {
      id,
    },
  });

  if (!resource) {
    throw new Error("Resource not found");
  }

  if (!resource.s3Key) {
    throw new Error("Resource file not found");
  }

  const url = await getFileUrlFromS3(resource.s3Key);

  return url;
};

export const getResourceDownloadUrl = async (id: number) => {
  const resource = await prisma.resource.findUnique({
    where: {
      id,
    },
  });

  if (!resource) {
    throw new Error("Resource not found");
  }

  if (!resource.s3Key) {
    throw new Error("Resource file not found");
  }

  const url = await getDownloadUrl(resource.s3Key);

  return url;
};

export const updateResource = async (id: number, data: { title?: string; subject?: string; semester?: number; program?: string; course?: string; resourceType?: string }) => {
  return await prisma.resource.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteResource = async (id: number) => {
  return await prisma.resource.delete({
    where: {
      id: id,
    },
  });
};

