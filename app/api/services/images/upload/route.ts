import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { getAllFeaturedServices, getServiceSlug } from "@/lib/featured-services";
import type { ServiceImageFit } from "@/lib/service-image-display";
import {
  deleteUploadedServiceImages,
  isUploadedServiceImage,
} from "@/lib/service-image-storage";
import { saveUploadedServiceImage } from "@/lib/service-image-storage";
import {
  deleteServiceImage,
  getAdminServiceImageItemsResolved,
  getServiceImageOverrides,
  updateServiceImageDisplay,
  upsertServiceImage,
} from "@/lib/service-images";

async function requireAdmin() {
  const token = (await cookies()).get("llg_admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return false;
  }
  return true;
}

function isValidServiceSlug(slug: string) {
  return getAllFeaturedServices().some((service) => getServiceSlug(service) === slug);
}

function revalidateServicePages() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const formData = await request.formData();
  const serviceSlug = String(formData.get("serviceSlug") ?? "").trim();
  const file = formData.get("file");

  if (!serviceSlug || !isValidServiceSlug(serviceSlug)) {
    return NextResponse.json({ error: "Dịch vụ không tồn tại" }, { status: 404 });
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Vui lòng chọn file ảnh." }, { status: 400 });
  }

  try {
    const imagePath = await saveUploadedServiceImage(serviceSlug, file);
    await upsertServiceImage(serviceSlug, imagePath);
    revalidateServicePages();

    const services = await getAdminServiceImageItemsResolved();
    const service = services.find((item) => item.slug === serviceSlug);

    return NextResponse.json({ service });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload ảnh thất bại.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const body = (await request.json()) as {
    serviceSlug?: string;
    fit?: ServiceImageFit;
    scale?: number;
    positionX?: number;
    positionY?: number;
  };

  const serviceSlug = body.serviceSlug?.trim() ?? "";
  if (!serviceSlug || !isValidServiceSlug(serviceSlug)) {
    return NextResponse.json({ error: "Dịch vụ không tồn tại" }, { status: 404 });
  }

  await updateServiceImageDisplay(serviceSlug, {
    fit: body.fit,
    scale: body.scale,
    positionX: body.positionX,
    positionY: body.positionY,
  });

  revalidateServicePages();

  const services = await getAdminServiceImageItemsResolved();
  const service = services.find((item) => item.slug === serviceSlug);

  return NextResponse.json({ service });
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 401 });
  }

  const serviceSlug = request.nextUrl.searchParams.get("serviceSlug")?.trim() ?? "";
  if (!serviceSlug || !isValidServiceSlug(serviceSlug)) {
    return NextResponse.json({ error: "Dịch vụ không tồn tại" }, { status: 404 });
  }

  const overrides = await getServiceImageOverrides();
  const currentImage = overrides[serviceSlug];
  if (currentImage && isUploadedServiceImage(currentImage)) {
    await deleteUploadedServiceImages(serviceSlug);
  }

  await deleteServiceImage(serviceSlug);
  revalidateServicePages();

  const services = await getAdminServiceImageItemsResolved();
  const service = services.find((item) => item.slug === serviceSlug);

  return NextResponse.json({ service });
}
