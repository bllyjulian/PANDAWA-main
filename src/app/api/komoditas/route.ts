import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Use full table names without aliases
    const [rows] = await db.query(`
      SELECT 
        hasil_panen.id_panen,
        hasil_panen.id_kecamatan,
        hasil_panen.id_komoditas,
        hasil_panen.tahun_panen,
        hasil_panen.luas_panen,
        hasil_panen.produksi,
        hasil_panen.produktivitas,
        data_kecamatan.nama_kecamatan,
        komoditas.nama_komoditas
      FROM 
        hasil_panen
      JOIN 
        data_kecamatan ON hasil_panen.id_kecamatan = data_kecamatan.id_kecamatan
      JOIN 
        komoditas ON hasil_panen.id_komoditas = komoditas.id_komoditas
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error saat mengambil data hasil panen:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data' }, 
      { status: 500 }
    );
  }
}