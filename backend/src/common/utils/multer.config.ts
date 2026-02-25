import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export function createMulterOptions(
  folder: string,
  options?: {
    maxSize?: number;
    allowedMimeTypes?: string[];
  },
) {
  return {
    storage: diskStorage({
      destination: `./uploads/${folder}`,
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),

    limits: {
      fileSize: options?.maxSize ?? 10 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
      if (
        options?.allowedMimeTypes &&
        !options.allowedMimeTypes.includes(file.mimetype)
      ) {
        return cb(new BadRequestException('File type not allowed'), false);
      }
      cb(null, true);
    },
  };
}
