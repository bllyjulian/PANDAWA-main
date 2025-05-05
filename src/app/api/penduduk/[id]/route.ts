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
    const { laju_pertumbuhan, jml_penduduk, tahun } = body;

    // Validate data
    if (laju_pertumbuhan === undefined || jml_penduduk === undefined || tahun === undefined) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Perform the update with the correct field names
    const [result] = await db.query(
      `UPDATE data_penduduk SET laju_pertumbuhan = ?, jml_penduduk = ?, tahun = ? WHERE id_penduduk = ?`,
      [laju_pertumbuhan, jml_penduduk, tahun, id]
    );

    // Check if any rows were affected
    const updatedRows = (result as any).affectedRows;
    if (updatedRows === 0) {
      return NextResponse.json(
        { error: 'Data penduduk tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Data penduduk berhasil diupdate',
      updated: {
        id_penduduk: id,
        laju_pertumbuhan,
        jml_penduduk,
        tahun
      }
    });

  } catch (error) {
    console.error('Error updating penduduk data:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate data penduduk' },
      { status: 500 }
    );
  }
}