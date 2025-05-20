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
  id: number; // Unique identifier for each product
  name: string; // Product name
  // penduduk: string; // penduduk of the product
  image: string; // URL or path to the product image
  penduduk: number; // penduduk of the product
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "Bondowoso",
    penduduk: 76.805,
    image: "/kecamatan/bondowoso.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Tlogosari",
    penduduk: 47.078,
    image: "/kecamatan/tlogosari.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Cermee",
    penduduk: 46.353,
    image: "/kecamatan/cermee.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "Tenggarang",
    penduduk: 43.973,
    image: "/kecamatan/tenggarang.jpg", // Replace with actual image URL
  },
  {
    id: 5,
    name: "Maesan",
    penduduk: 42.212,
    image: "/kecamatan/maesan.jpg", // Replace with actual image URL
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Penduduk Teratas
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
                penduduk
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
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
                  <Badge>
                    {product.penduduk}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
