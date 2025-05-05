import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await db.query(`
      SELECT 
        data_penduduk.id_penduduk,
        data_kecamatan.nama_kecamatan,
        data_penduduk.laju_pertumbuhan,
        data_penduduk.jml_penduduk,
        data_penduduk.tahun
      FROM data_penduduk
      JOIN data_kecamatan ON data_penduduk.id_kecamatan = data_kecamatan.id_kecamatan
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error saat mengambil data penduduk:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    );
  }
}
