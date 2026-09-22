import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy validate
    if (!body || !body.itemType || !body.brand) {
      return NextResponse.json(
        {
          statusCode: 400,
          code: "VALIDATION_ERROR",
          message: "Data form tidak lengkap.",
          timestamp: new Date().toISOString(),
          method: "POST",
          path: "/api/pawn/submit",
          data: null,
        },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json({
      statusCode: 200,
      code: "SUCCESS",
      message: "Data Pawn Application berhasil disimpan (MOCK).",
      timestamp: new Date().toISOString(),
      method: "POST",
      path: "/api/pawn/submit",
      data: {
        transactionId: "TRX-" + Math.floor(Math.random() * 1000000),
        receivedData: body, // Echoing back the data for debugging
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        code: "INTERNAL_ERROR",
        message: "Terjadi kesalahan pada server saat memproses data.",
        timestamp: new Date().toISOString(),
        method: "POST",
        path: "/api/pawn/submit",
        data: null,
      },
      { status: 500 }
    );
  }
}
