/* File: app/api/kecamatan/[id]/route.ts */
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { nama_kecamatan, deskripsi, area } = body;

    // Validate required fields
    if (!nama_kecamatan || !deskripsi || !area) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Perform the update
    const [result] = await db.query(
      `UPDATE data_kecamatan SET nama_kecamatan = ?, deskripsi = ?, area = ? WHERE id_kecamatan = ?`,
      [nama_kecamatan, deskripsi, area, id]
    );

    // Check if any rows were affected
    const updatedRows = (result as any).affectedRows;
    if (updatedRows === 0) {
      return NextResponse.json(
        { error: 'Kecamatan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Kecamatan berhasil diupdate',
      updated: {
        id_kecamatan: id,
        nama_kecamatan,
        deskripsi,
        area
      }
    });
    
  } catch (error) {
    console.error('Error updating kecamatan:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate kecamatan' },
      { status: 500 }
    );
  }
}