import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const surat = await prisma.surat.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        judul: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const activities = surat.map((s) => ({
      id: s.id,
      title: s.judul,
      type:
        s.createdAt.getTime() === s.updatedAt.getTime()
          ? "created"
          : "updated",
      date: s.updatedAt,
    }));

    return NextResponse.json(activities);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load activities" },
      { status: 500 }
    );
  }
}
