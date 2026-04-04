import type { Metadata } from "next";
import { DashboardMetrics } from "@/components/pages/DashboardMetrics";
import React from "react";
import MonthlyChart from "@/components/pages/MonthlyChart";
import RecentOrders from "@/components/pages/RecentOrders";
import PredictionChart from "@/components/pages/PredictionChart"; 

export const metadata: Metadata = {
  title: "PANDAWA",
  description: "Pantau Sumber Daya Alam Wilayah Bondowoso",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6"> 
      
      {/* BARIS ATAS: Metrik, Grafik Bulanan, dan Tabel Kanan */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <DashboardMetrics />
          <MonthlyChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <RecentOrders />
        </div>
      </div>

      {/* BARIS BAWAH: Grafik Prediksi 2026 (Lebar Penuh) */}
      <div className="w-full">
        <PredictionChart />
      </div>

    </div>
  );
}