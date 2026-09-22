import { NextResponse } from "next/server";
import { DummyCMKProduct } from "@/app/(protected)/_data/data-cmkproduct";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const plu = searchParams.get("plu");
  const type = searchParams.get("type"); // "PG" or "DJ"

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!plu) {
    return NextResponse.json(
      {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "PLU is required",
        timestamp: new Date().toISOString(),
        method: "GET",
        path: "/api/pawn/check-plu",
        data: null,
      },
      { status: 400 }
    );
  }

  const item = DummyCMKProduct.find((p) => p.plu.toLowerCase() === plu.toLowerCase());

  if (!item) {
    return NextResponse.json(
      {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "PLU tidak ditemukan di database.",
        timestamp: new Date().toISOString(),
        method: "GET",
        path: "/api/pawn/check-plu",
        data: null,
      },
      { status: 404 }
    );
  }

  if (type && item.item_category !== type) {
    return NextResponse.json(
      {
        statusCode: 400,
        code: "TYPE_MISMATCH",
        message: `PLU (${plu}) is not suitable for CMK ${type === 'PG' ? 'Plain Gold' : 'Diamond Jewelry'}!`,
        timestamp: new Date().toISOString(),
        method: "GET",
        path: "/api/pawn/check-plu",
        data: null,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    statusCode: 200,
    code: "SUCCESS",
    message: "PLU berhasil ditemukan",
    timestamp: new Date().toISOString(),
    method: "GET",
    path: "/api/pawn/check-plu",
    data: item,
  });
}
