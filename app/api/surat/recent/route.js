// app/api/surat/recent/route.js
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const letters = await prisma.surat.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return NextResponse.json(letters);
  } catch (err) {
    console.error("Error fetch recent letters:", err);
    return NextResponse.json(
      { error: "Gagal ambil recent letters" },
      { status: 500 }
    );
  }
}
