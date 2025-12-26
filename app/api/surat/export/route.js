import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import ExcelJS from "exceljs";

export async function GET() {
  try {
    // 1. Ambil semua surat dari DB
    const data = await prisma.surat.findMany({
      orderBy: { createdAt: "desc" },
    });

    // 2. Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Letters");

    // 3. Header
    sheet.columns = [
      { header: "Ref Number", key: "refNumber", width: 25 },
      { header: "Title", key: "judul", width: 30 },
      { header: "Sender", key: "pengirim", width: 20 },
      { header: "Type", key: "jenis", width: 15 },
      { header: "Dept", key: "departemen", width: 15 },
      { header: "Purpose", key: "tujuan", width: 25 },
      { header: "Summary", key: "isi", width: 40 },
      { header: "Date", key: "tanggal", width: 20 },
    ];

    // 4. Isi data
    data.forEach((surat) => {
      sheet.addRow({
        refNumber: surat.refNumber,
        judul: surat.judul,
        pengirim: surat.pengirim,
        jenis: surat.jenis,
        departemen: surat.departemen,
        tujuan: surat.tujuan,
        isi: surat.isi,
        tanggal: surat.tanggal,
      });
    });

    // 5. Generate buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=letters.xlsx`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Gagal export data" },
      { status: 500 }
    );
  }
}
