// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '../../../../lib/prisma';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]/route';

// async function getSession(req) {
//   return await getServerSession(authOptions);
// }

// // GET - Ambil surat berdasarkan ID
// export async function GET(request, { params }) {
//   try {
//     const session = await getSession(request);
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { id } = params;
    
//     const surat = await prisma.surat.findUnique({
//       where: { id },
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true,
//             departemen: true
//           }
//         }
//       }
//     });

//     if (!surat) {
//       return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
//     }

//     // Cek permission - user hanya bisa lihat surat departemennya sendiri (kecuali admin)
//     if (session.user.role !== 'admin' && surat.departemen !== session.user.departemen) {
//       return NextResponse.json({ error: 'Tidak memiliki akses untuk melihat surat ini' }, { status: 403 });
//     }

//     return NextResponse.json(surat);
//   } catch (error) {
//     console.error('Error fetching surat:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// // PUT - Update surat
// export async function PUT(request, { params }) {
//   try {
//     const session = await getSession(request);
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { id } = params;
//     const body = await request.json();
//     const { judul, kategori, departemen, perihal, tujuan, isi, status } = body;
    
//     // Cek apakah surat ada dan user berhak mengupdate
//     const existingSurat = await prisma.surat.findUnique({
//       where: { id }
//     });
    
//     if (!existingSurat) {
//       return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
//     }
    
//     // Cek permission
//     if (session.user.role !== 'admin' && existingSurat.createdBy !== session.user.id) {
//       return NextResponse.json({ error: 'Tidak memiliki akses untuk mengupdate surat ini' }, { status: 403 });
//     }
    
//     const updateData = {};
//     if (judul) updateData.judul = judul;
//     if (kategori) updateData.kategori = kategori;
//     if (departemen) updateData.departemen = departemen;
//     if (perihal) updateData.perihal = perihal;
//     if (tujuan) updateData.tujuan = tujuan;
//     if (isi) updateData.isi = isi;
//     if (status) updateData.status = status;
    
//     const surat = await prisma.surat.update({
//       where: { id },
//       data: updateData,
//       include: {
//         user: {
//           select: {
//             name: true,
//             email: true
//           }
//         }
//       }
//     });
    
//     return NextResponse.json(surat);
//   } catch (error) {
//     console.error('Error updating surat:', error);
//     return NextResponse.json({ error: 'Gagal mengupdate surat' }, { status: 500 });
//   }
// }

// // DELETE - Hapus surat
// export async function DELETE(request, { params }) {
//   try {
//     const session = await getSession(request);
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { id } = params;
    
//     // Cek apakah surat ada dan user berhak menghapus
//     const existingSurat = await prisma.surat.findUnique({
//       where: { id }
//     });
    
//     if (!existingSurat) {
//       return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
//     }
    
//     // Cek permission
//     if (session.user.role !== 'admin' && existingSurat.createdBy !== session.user.id) {
//       return NextResponse.json({ error: 'Tidak memiliki akses untuk menghapus surat ini' }, { status: 403 });
//     }
    
//     await prisma.surat.delete({
//       where: { id }
//     });
    
//     return NextResponse.json({ message: 'Surat berhasil dihapus' });
//   } catch (error) {
//     console.error('Error deleting surat:', error);
//     return NextResponse.json({ error: 'Gagal menghapus surat' }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import prisma from "../../../../lib/prisma";

// export async function GET(req, { params }) {
//   try {
//     const surat = await prisma.surat.findUnique({
//       where: { id: params.id },
//     });

//     if (!surat) {
//       return NextResponse.json(
//         { error: "Surat tidak ditemukan" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(surat);
//   } catch (err) {
//     console.error("Error fetch surat:", err);
//     return NextResponse.json({ error: "Gagal ambil surat" }, { status: 500 });
//   }
// }
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import fs from "fs/promises";
import path from "path";

//  GET: ambil detail surat by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const surat = await prisma.surat.findUnique({ where: { id } });

    if (!surat) {
      return NextResponse.json({ error: "Surat tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(surat);
  } catch (err) {
    console.error("❌ Error get surat:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: update surat
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    const updateData = {
      judul: formData.get("judul"),
      pengirim: formData.get("pengirim"),
      jenis: formData.get("jenis"),
      tujuan: formData.get("tujuan"),
      refNumber: formData.get("refNumber"),
      departemen: formData.get("departemen"),
      isi: formData.get("isi"),
    };

    // kalau ada file baru, simpan ulang
    const file = formData.get("file");
    if (file && typeof file === "object") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.name);
      await fs.writeFile(filePath, buffer);

      updateData.fileUrl = `/uploads/${file.name}`;
    }

    const surat = await prisma.surat.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(surat);
  } catch (err) {
    console.error("❌ Error updating surat:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.surat.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting surat:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
