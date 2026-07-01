import { z } from "zod";

export const imageDisplaySchema = z
  .object({
    fit: z.enum(["cover", "contain"]).optional(),
    scale: z.number().min(50).max(150).optional(),
    positionX: z.number().min(0).max(100).optional(),
    positionY: z.number().min(0).max(100).optional(),
  })
  .optional();
