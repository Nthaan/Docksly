// import { NextResponse } from "next/server";
// import { prisma } from "../../../lib/prisma";
// import { generateNomorSurat } from "../../../utils/generateNomorSurat";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { judul, pengirim, jenis, tujuan, departemen, isi, createdBy } = body;

//     if (!judul || !pengirim || !jenis || !tujuan || !departemen || !isi) {
//       return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
//     }

//     // generate nomor otomatis
//     const refNumber = await generateNomorSurat(departemen);

//     const surat = await prisma.surat.create({
//       data: {
//         judul,
//         pengirim,
//         jenis,
//         tujuan,
//         refNumber,      // pakai yang auto generate
//         departemen,
//         isi,
//         createdBy: createdBy || "dummyUser",
//       },
//     });

//     return NextResponse.json(surat, { status: 201 });
//   } catch (error) {
//     console.error("Error creating surat:", error);
//     return NextResponse.json({ error: "Gagal membuat surat", details: error.message }, { status: 500 });
//   }
// }
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import fs from "fs/promises";
import path from "path";
import { generateNomorSurat } from "../../../utils/generateNomorSurat";

//  GET: list semua surat
export async function GET() {
  try {
    const data = await prisma.surat.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Error fetch surat:", err);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// POST: buat surat baru
export async function POST(req) {
  try {
    const formData = await req.formData();

    const judul = formData.get("judul");
    const pengirim = formData.get("pengirim");
    const jenis = formData.get("jenis");
    const tujuan = formData.get("tujuan");
    const refNumber =
      formData.get("refNumber") ||
      (await generateNomorSurat(formData.get("departemen")));
    const departemen = formData.get("departemen");
    const isi = formData.get("isi");
    const createdBy = "dummyUser";

    // handle file upload
    let fileUrl = null;
    const file = formData.get("file");
    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.name);
      await fs.writeFile(filePath, buffer);

      fileUrl = `/uploads/${file.name}`;
    }

    const surat = await prisma.surat.create({
      data: {
        judul,
        pengirim,
        jenis,
        tujuan,
        refNumber,
        departemen,
        isi,
        createdBy,
        fileUrl,
      },
    });

    return NextResponse.json(surat, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving surat:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
