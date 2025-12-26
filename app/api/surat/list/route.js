import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pinnedOnly = searchParams.get("pinned");

    const data = await prisma.surat.findMany({
      where: pinnedOnly === "true" ? { pinned: true } : {}, // 
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetch surat:", err);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}
