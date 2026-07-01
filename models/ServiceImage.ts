import { Model, Schema, model, models } from "mongoose";

export interface ServiceImageDocument {
  serviceSlug: string;
  image: string;
  updatedAt: Date;
}

const ServiceImageSchema = new Schema<ServiceImageDocument>(
  {
    serviceSlug: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

const ServiceImage: Model<ServiceImageDocument> =
  models.ServiceImage || model<ServiceImageDocument>("ServiceImage", ServiceImageSchema);

export default ServiceImage;
