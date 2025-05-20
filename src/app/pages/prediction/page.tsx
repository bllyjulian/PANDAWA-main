import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TablePrediksi from "@/components/tables/TablePrediksi";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PANDAWA | Commodity",
  description:
    "PANDAWA",
};

export default function CommodityPage() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="Data Prediksi Panen">
          <TablePrediksi />
        </ComponentCard>
      </div>
    </div>
  );
}
