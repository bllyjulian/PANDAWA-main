import { useState, useEffect } from 'react';
import Image from "next/image";
// Hapus import data statis agar tidak bingung
// import { Kecamatan } from '@/data/kecamatan'; 

// 1. Update Interface Props untuk menerima 'data'
interface SidebarProps {
    onSelectKecamatan: (kecamatan: any) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
    data: any[]; // <--- TAMBAHAN: Menerima array data dari Map.tsx
}

export function Sidebar({ onSelectKecamatan, isOpen, toggleSidebar, data }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    // Inisialisasi state dengan data kosong atau data dari props
    const [filteredKecamatan, setFilteredKecamatan] = useState<any[]>(data || []);

    // 2. Update useEffect agar bereaksi jika 'data' dari API masuk
    useEffect(() => {
        // Jika data belum ada (masih loading di parent), jangan lakukan apa-apa
        if (!data) return;

        if (searchTerm.trim() === '') {
            setFilteredKecamatan(data); // Gunakan data dari props
        } else {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredKecamatan(filtered);
        }
    }, [searchTerm, data]); // PENTING: Jalankan ulang saat 'data' berubah

    return (
        <div className={`fixed p-2 top-0 left-0 h-screen z-40 ${isOpen ? 'w-75' : 'w-20'} duration-300`}>
            <div className={`bg-white rounded-xl border-r border-gray-200 shadow-sm h-full flex flex-col`}>
                
                {/* --- LOGO SECTION --- */}
                <div className={`flex ${isOpen ? 'justify-between' : 'justify-center'} items-center p-4`}>
                    {isOpen ? (
                        <>
                            <a href="/" className="flex items-center gap-2">
                                <Image src="/images/logo/logo-icon-pandawa.png" width={28} height={28} alt="Logo" />
                                <span className="font-bold text-gray-800">PANDAWA</span>
                            </a>
                            <button
                                onClick={toggleSidebar}
                                className="bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all rounded-md p-1 text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="flex justify-center w-full">
                            <button
                                onClick={toggleSidebar}
                                className="cursor-pointer flex items-center justify-center"
                                title="Expand sidebar"
                            >
                                <Image src="/images/logo/logo-icon-pandawa.png" width={28} height={28} alt="Logo" />
                            </button>
                        </div>
                    )}
                </div>

                {/* --- SEARCH BOX --- */}
                {isOpen ? (
                    <div className="px-4 pb-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari kecamatan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center pb-2">
                        <button
                            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            onClick={toggleSidebar}
                            title="Search kecamatan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* --- KECAMATAN LIST (Bagian Penting) --- */}
                <div className="overflow-y-auto flex-grow custom-scrollbar">
                    <h2 className={isOpen ? 'px-4 p-1.5 font-medium text-gray-800' : 'hidden'}>
                        Daftar Kecamatan
                    </h2>
                    <ul>
                        {filteredKecamatan.map((item: any) => {
                            // --- LOGIC FORMAT ANGKA (Agar tidak NaN) ---
                            // Cek data dari DB (jml_penduduk) atau fallback ke static (population)
                            const rawPop = item.jml_penduduk || item.population || "-";
                            let displayPop = rawPop;
                            
                            // Validasi dan format angka
                            if (rawPop !== "-" && rawPop !== undefined && rawPop !== null) {
                                // Bersihkan karakter non-angka (jika ada titik/koma sebelumnya)
                                const cleanNum = String(rawPop).replace(/\./g, '').replace(/,/g, '');
                                const num = Number(cleanNum);
                                
                                // Jika valid number, format ke ribuan
                                if (!isNaN(num)) {
                                    displayPop = num.toLocaleString('id-ID');
                                }
                            }
                            // ------------------------------------------

                            return (
                                <li
                                    key={item.name} 
                                    className={`
                                        ${isOpen ? 'mx-3 p-2.5 rounded-lg' : 'mx-2 p-2 rounded-lg justify-center hidden'} 
                                        hover:bg-gray-100 cursor-pointer transition-colors my-1
                                    `}
                                    onClick={() => onSelectKecamatan(item)}
                                    title={!isOpen ? item.name : ''}
                                >
                                    {isOpen ? (
                                        <div className="flex items-center">
                                            <div
                                                className="w-4 h-4 rounded-sm mr-3"
                                                style={{ backgroundColor: item.defaultColor || "#5b9bd5" }}
                                            ></div>
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    Populasi: {displayPop} jiwa
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: item.defaultColor || "#5b9bd5" }}
                                        >
                                            <span className="text-white font-bold text-sm">
                                                {item.name ? item.name.slice(0, 2).toUpperCase() : "??"}
                                            </span>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                        
                        {/* Pesan jika tidak ada hasil pencarian */}
                        {filteredKecamatan.length === 0 && isOpen && (
                            <li className="p-4 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm">Tidak ada kecamatan yang sesuai</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* --- FOOTER --- */}
                <div className="py-5.5 px-4 mt-auto">
                    {isOpen ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500">Peta Interaktif Bondowoso</p>
                                <p className="text-xs text-gray-500">Data BPS Kabupaten Bondowoso</p>
                            </div>
                            <div className="text-xs px-2.5 py-1.5 bg-gray-100 rounded-md text-gray-500">?</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xs px-2.5 py-1.5 bg-gray-100 rounded-md text-gray-500 mb-1">?</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}