import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const byDepartment = await prisma.surat.groupBy({
      by: ["departemen"],
      _count: {
        departemen: true,
      },
    });

    return NextResponse.json({ byDepartment });
  } catch (error) {
    console.error("STAT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal ambil statistik" },
      { status: 500 }
    );
  }
}
