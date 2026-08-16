import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { tag, path } = body;

    if (tag) {
      revalidateTag(tag);
    }
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated tag: ${tag || "none"}, path: ${path || "none"}`,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
