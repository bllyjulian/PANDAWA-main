"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from 'next/image';

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PredictionChart() {
  const [chartData, setChartData] = useState<{ categories: string[], data: number[] }>({
    categories: [],
    data: []
  });
  const [allData, setAllData] = useState<any[]>([]);
  const [komoditasOptions, setKomoditasOptions] = useState<string[]>([]); 
  const [selectedKomoditas, setSelectedKomoditas] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
// Tambahkan cache: 'no-store' atau dummy parameter timestamp supaya tidak dibaca dari cache
const res = await fetch(`/api/komoditas?t=${new Date().getTime()}`, { 
  cache: 'no-store' 
});

        if (!res.ok) throw new Error("Gagal mengambil data");
        
        const result = await res.json();
        console.log("Data dari API:", result);
        
        if (Array.isArray(result)) {
          // Filter hanya tahun 2026
          const data2026 = result.filter(item => String(item.tahun_panen || item.tahun) === "2026");
          setAllData(data2026);

          // Ambil daftar nama komoditas unik
          const komoditas = Array.from(new Set(data2026.map((item: any) => item.nama_komoditas?.trim())))
            .filter(k => k && k !== "undefined" && k !== "null") as string[];

          setKomoditasOptions(komoditas);
          
          // Set default komoditas ke item pertama
          if (komoditas.length > 0) {
              setSelectedKomoditas(komoditas[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Process and Sort Data
// Process and Sort Data
useEffect(() => {
  if (allData.length === 0 || !selectedKomoditas) {
      setChartData({ categories: [], data: [] });
      return;
  }

  // 1. Filter berdasarkan komoditas yang dipilih
  const filteredData = allData.filter((item: any) => item.nama_komoditas?.trim() === selectedKomoditas);

  // 2. Agregasi total produksi per kecamatan ke dalam Object
  const aggregation: { [key: string]: number } = {};

  filteredData.forEach((item: any) => {
    const namaKecamatan = item.nama_kecamatan ? item.nama_kecamatan.trim() : "Lainnya";
    
    // Pastikan properti yang diambil sesuai dengan respons API (produksi atau hasil_prediksi)
    const rawProduksi = item.produksi || item.hasil_prediksi; 
    let nilai = 0;

    if (typeof rawProduksi === 'string') {
       nilai = parseFloat(rawProduksi.replace(/\./g, '').replace(/,/g, '.')) || 0;
    } else {
       nilai = Number(rawProduksi) || 0;
    }

    if (namaKecamatan) {
      aggregation[namaKecamatan] = (aggregation[namaKecamatan] || 0) + nilai;
    }
  });

  // 3. Ubah object hasil agregasi menjadi array of objects agar bisa diurutkan dengan aman
  const dataArray = Object.keys(aggregation).map(kecamatanKey => {
    return {
      kecamatan: kecamatanKey,
      totalProduksi: aggregation[kecamatanKey]
    };
  });

  // 4. Sort array tersebut dari yang TERBESAR ke TERKECIL berdasarkan nilai totalProduksi
  dataArray.sort((a, b) => b.totalProduksi - a.totalProduksi);

  // 5. Pisahkan kembali menjadi array kategori dan data secara sinkron
  const sortedCategories = dataArray.map(item => item.kecamatan);
  const sortedValues = dataArray.map(item => Number(item.totalProduksi.toFixed(2)));

  // 6. Masukkan ke dalam state chartData
  setChartData({
    categories: sortedCategories,
    data: sortedValues
  });

}, [selectedKomoditas, allData]);

  // Chart Configuration
  const chartOptions: ApexOptions = {
    colors: ["#3b82f6"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 420,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false, 
        columnWidth: "60%",
        borderRadius: 4,
        dataLabels: {
            position: 'top', 
        },
      },
    },
    dataLabels: {
      enabled: false, 
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories, 
      axisBorder: { show: true },
      axisTicks: { show: true },
      labels: {
        style: {
            fontSize: '11px',
            fontWeight: 500,
        },
        rotate: -45, 
        trim: false,
        hideOverlappingLabels: false 
      }
    },
    yaxis: {
      title: { 
        text: 'Produksi (Ton)',
        style: { fontWeight: 500 }
      },
      labels: {
        formatter: (value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
            return value.toFixed(0);
        }
      }
    },
    grid: {
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString('id-ID')} Ton`,
      },
      x: {
          formatter: (val: string) => `Kecamatan: ${val}`
      }
    },
  };

  const chartSeries = [
    {
      name: "Prediksi Produksi",
      data: chartData.data,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Prediksi Hasil Panen 2026
            </h3>
            <p className="text-sm text-gray-500">Estimasi produksi berdasarkan Kecamatan</p>
        </div>

        <div className="relative">
            <select 
                value={selectedKomoditas}
                onChange={(e) => setSelectedKomoditas(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white cursor-pointer"
                disabled={isLoading || komoditasOptions.length === 0}
            >
                {komoditasOptions.map((komoditas) => (
                    <option key={komoditas} value={komoditas}>{komoditas}</option>
                ))}
                {komoditasOptions.length === 0 && !isLoading && <option disabled>Tidak ada data</option>}
            </select>
            
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <Image src="/icons/chevron-down.svg" width={16} height={16} alt="v" />
            </div>
        </div>

      </div>

      <div className="w-full">
          {isLoading ? (
             <div className="h-[420px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                Loading Data Prediksi 2026...
             </div>
          ) : chartData.categories.length > 0 ? (
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={420} 
            />
          ) : (
            <div className="h-[420px] flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                Data prediksi 2026 belum tersedia.
            </div>
          )}
      </div>
    </div>
  );
}