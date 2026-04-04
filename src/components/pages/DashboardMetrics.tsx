"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import Image from 'next/image';

export const DashboardMetrics = () => {
  // State untuk menyimpan hasil perhitungan
  const [metrics, setMetrics] = useState({
    totalPenduduk: 0,
    avgLaju: "0",
    totalKomoditas: 0,
    trend: "positive" // Untuk menentukan warna badge (hijau/merah)
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Ambil data dari 2 API secara paralel
        const [resPenduduk, resMap] = await Promise.all([
          fetch('/api/penduduk'),
          fetch('/api/map') // Asumsi endpoint ini berisi data panen/komoditas
        ]);

        if (!resPenduduk.ok || !resMap.ok) throw new Error("Gagal mengambil data");

        const dataPenduduk = await resPenduduk.json();
        const dataMap = await resMap.json();

        // --- 1. LOGIKA PENDUDUK & LAJU ---
        let totalPopulasi = 0;
        let totalLaju = 0;
        let countData = 0;

        // Cari tahun terbaru agar kita hanya menjumlahkan data tahun ini
        // (Jaga-jaga jika API mengembalikan data history tahun lalu juga)
        const years = dataPenduduk.map((item: any) => Number(item.tahun));
        const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

        // Filter data hanya tahun terbaru
        const currentYearData = dataPenduduk.filter((item: any) => Number(item.tahun) === maxYear);

        currentYearData.forEach((item: any) => {
          // Bersihkan string angka (misal: "12.500" -> 12500)
          const cleanPop = String(item.jml_penduduk).replace(/\./g, '').replace(/,/g, '');
          const pop = Number(cleanPop);
          
          const cleanLaju = String(item.laju_pertumbuhan).replace(',', '.');
          const laju = parseFloat(cleanLaju);

          if (!isNaN(pop)) totalPopulasi += pop;
          if (!isNaN(laju)) {
            totalLaju += laju;
            countData++;
          }
        });

        // Hitung Rata-rata Laju Pertumbuhan Kabupaten
        const avgLajuResult = countData > 0 ? (totalLaju / countData).toFixed(2) : "0";

        // --- 2. LOGIKA KOMODITAS ---
        // Hitung jumlah jenis komoditas UNIK (Unique)
        // Misal: Kecamatan A punya Padi, Kecamatan B punya Padi. Hasilnya tetap 1 jenis.
        const uniqueKomoditas = new Set(dataMap.map((item: any) => item.nama_komoditas)).size;

        setMetrics({
          totalPenduduk: totalPopulasi,
          avgLaju: avgLajuResult,
          totalKomoditas: uniqueKomoditas,
          trend: parseFloat(avgLajuResult) >= 0 ? "positive" : "negative"
        });

      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      
      {/* */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image src="/icons/group.svg" width={20} height={20} alt="Group" className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Penduduk
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isLoading ? "Loading..." : metrics.totalPenduduk.toLocaleString('id-ID')}
            </h4>
          </div>
          
          <Badge color={metrics.trend === "positive" ? "success" : "error"}>
            <Image 
                src={metrics.trend === "positive" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"} 
                width={20} 
                height={20} 
                alt={metrics.trend === "positive" ? "Up" : "Down"} 
            />
            {isLoading ? "-" : `${metrics.avgLaju}%`}
          </Badge>
        </div>
      </div>
      {/* */}

      {/* */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image src="/icons/box-line.svg" width={20} height={20} alt="Box Line" className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Jumlah Jenis Komoditas
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isLoading ? "..." : metrics.totalKomoditas}
            </h4>
          </div>
        </div>
      </div>
      {/* */}
      
    </div>
  );
};