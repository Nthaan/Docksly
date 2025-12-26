import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req, context) {
  try {
    const { params } = context; 
    const { id } = await params;

    const body = await req.json();
    const surat = await prisma.surat.update({
      where: { id },
      data: { pinned: body.pinned },
    });

    return NextResponse.json(surat);
  } catch (err) {
    console.error("Error update pin:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
