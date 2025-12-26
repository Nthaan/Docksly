import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const total = await prisma.surat.count();

    const formal = await prisma.surat.count({
      where: { jenis: "Formal" },
    });

    const nonFormal = await prisma.surat.count({
      where: { jenis: "NonFormal" },
    });

    const thisMonth = await prisma.surat.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    return NextResponse.json({
      total,
      formal,
      nonFormal,
      thisMonth,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stat error" }, { status: 500 });
  }
}
