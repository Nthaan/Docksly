import { NextResponse } from "next/server";
import { generateNomorSurat } from "../../../../utils/generateNomorSurat";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const departemen = searchParams.get("departemen");

    if (!departemen) {
      return NextResponse.json(
        { error: "Departemen wajib diisi" },
        { status: 400 }
      );
    }

    // hanya generate nomor (preview), tanpa insert ke DB
    const refNumber = await generateNomorSurat(departemen);

    return NextResponse.json({ refNumber });
  } catch (error) {
    console.error("Error generate nomor:", error);
    return NextResponse.json(
      { error: "Gagal generate nomor", detail: error.message },
      { status: 500 }
    );
  }
}
