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
    const { id_kecamatan, id_komoditas, tahun_panen, luas_panen, produksi, produktivitas } = body;

    // Validate data
    if (
      id_kecamatan === undefined || 
      id_komoditas === undefined || 
      tahun_panen === undefined ||
      luas_panen === undefined ||
      produksi === undefined ||
      produktivitas === undefined
    ) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Perform the update using id_panen as the primary key
    const [result] = await db.query(
      `UPDATE hasil_panen SET 
        id_kecamatan = ?, 
        id_komoditas = ?, 
        tahun_panen = ?, 
        luas_panen = ?, 
        produksi = ?, 
        produktivitas = ? 
      WHERE id_panen = ?`,
      [id_kecamatan, id_komoditas, tahun_panen, luas_panen, produksi, produktivitas, id]
    );

    // Check if any rows were affected
    const updatedRows = (result as any).affectedRows;
    if (updatedRows === 0) {
      return NextResponse.json(
        { error: 'Data hasil panen tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Data hasil panen berhasil diupdate',
      updated: {
        id_panen: id, // Also include id_panen for completeness
        id_kecamatan,
        id_komoditas,
        tahun_panen,
        luas_panen,
        produksi,
        produktivitas
      }
    });

  } catch (error) {
    console.error('Error updating hasil panen data:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate data hasil panen' },
      { status: 500 }
    );
  }
}