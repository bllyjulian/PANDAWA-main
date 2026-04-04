"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  image: string;
  penduduk: number;
}

export default function RecentOrders() {
  const [tableData, setTableData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopPenduduk() {
      try {
        // Kita ambil data penduduk
        const res = await fetch('/api/penduduk');
        if (!res.ok) throw new Error("Gagal mengambil data");
        
        const rawData = await res.json();

        // 1. Proses Data: Bersihkan angka & Sorting
        // Kita butuh array temporary untuk sorting
        const processedData = rawData.map((item: any) => {
            // Bersihkan string angka (misal "12.500" -> 12500)
            const cleanPop = String(item.jml_penduduk).replace(/\./g, '').replace(/,/g, '');
            const popNumber = Number(cleanPop) || 0;

            return {
                id: item.id_penduduk,
                name: item.nama_kecamatan,
                penduduk: popNumber,
                // Generate path gambar dinamis berdasarkan nama kecamatan
                // Contoh: "Bondowoso" -> "/kecamatan/bondowoso.jpg"
                image: `/kecamatan/${item.nama_kecamatan.toLowerCase().trim().replace(/\s+/g, '-')}.jpg`
            };
        });

        // 2. Sort Descending (Terbesar ke Terkecil)
        const sortedData = processedData.sort((a: any, b: any) => b.penduduk - a.penduduk);

        // 3. Ambil Top 5
        const top5 = sortedData.slice(0, 5);

        setTableData(top5);

      } catch (error) {
        console.error("Error fetching top penduduk:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopPenduduk();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Penduduk Teratas (Top 5)
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama Kecamatan
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Penduduk (Jiwa)
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
               <TableRow>
                 <TableCell colSpan={2} className="py-3 text-center text-gray-500">
                   Loading data...
                 </TableCell>
               </TableRow>
            ) : tableData.length === 0 ? (
                <TableRow>
                 <TableCell colSpan={2} className="py-3 text-center text-gray-500">
                   Belum ada data penduduk.
                 </TableCell>
               </TableRow>
            ) : (
                tableData.map((product) => (
                <TableRow key={product.id} className="">
                    <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100">
                        {/* Menggunakan Image dengan fallback error handling sederhana atau style object cover */}
                        <Image
                            width={50}
                            height={50}
                            src={product.image}
                            className="h-[50px] w-[50px] object-cover"
                            alt={product.name}
                            // Fallback image jika gambar kecamatan tidak ditemukan (opsional)
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/images/logo/logo-icon-pandawa.png"; // Ganti dengan placeholder kamu
                            }}
                        />
                        </div>
                        <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                        </p>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge color="light">
                        {product.penduduk.toLocaleString('id-ID')}
                    </Badge>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}