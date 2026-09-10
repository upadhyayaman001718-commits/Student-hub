import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";

import { randomUUID } from "crypto";

import { config } from "../config/env.config";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
    },
});

export const getFileUrlFromS3 = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
    });

    const url = await getSignedUrl(s3Client, command, {
        expiresIn: 900,
    });

    return url;
};
export const getDownloadUrl = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
    });

    const url = await getSignedUrl(s3Client, command, {
        expiresIn: 300,
    });

    return url;
};
export const uploadFileToS3 = async (file: Express.Multer.File) => {
    const key = `resources/${randomUUID()}-${file.originalname}`;

    const command = new PutObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3Client.send(command);

    return {
        key,
        fileName: file.originalname,
        fileType: file.mimetype,
    };
};