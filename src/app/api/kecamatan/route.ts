import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await db.query(`
    SELECT 
    data_kecamatan.id_kecamatan,
    data_kecamatan.nama_kecamatan,
    data_kecamatan.gambar,
    data_kecamatan.deskripsi,
    data_kecamatan.area,
    data_kecamatan.posisi_x,
    data_kecamatan.posisi_y,
    komoditas.nama_komoditas
  FROM data_kecamatan
  JOIN komoditas ON data_kecamatan.id_komoditas = komoditas.id_komoditas;
  
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
