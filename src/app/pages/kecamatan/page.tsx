import ComponentCard from "@/components/common/ComponentCard";
import TableKecamatan from "@/components/tables/TableKecamatan";
import Button from "@/components/ui/button/Button";


import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PANDAWA | Data Kecamatan",
  description:
    "PANDAWA",
};

export default function CommodityPage() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="Tabel Kecamatan">
          <TableKecamatan />
        </ComponentCard>
      </div>
    </div>
  );
}
