import { prisma } from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();

    const letter = await prisma.surat.create({
      data: {
        user: "cmdy5ptnj0000tye08izahufl",
        judul: data.judul,
        pengirim: data.pengirim,
        jenis: data.jenis,
        tujuan: data.tujuan,
        refNumber: data.refNumber,
        departemen: data.departemen,
        isi: data.isi,
        lampiran: data.lampiran,
        tanggal: data.tanggal ? new Date(data.tanggal) : undefined,
        createdBy: data.createdBy,
      },
    });

    return Response.json(letter, { status: 201 });
  } catch (err) {
    console.error("Prisma error:", err);
    return Response.json({ error: "Failed to create letter" }, { status: 500 });
  }
}
