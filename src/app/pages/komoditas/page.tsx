import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TableCommodity from "@/components/tables/TableCommodity";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PANDAWA | Komoditas",
  description:
    "PANDAWA",
};

export default function CommodityPage() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="Table Komoditas">
          <TableCommodity />
        </ComponentCard>
      </div>
    </div>
  );
}
