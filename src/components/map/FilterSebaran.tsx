import { useState, useEffect } from 'react';

interface FilterProps {
    // Props untuk Filter Komoditas
    activePinFilters: Set<string>;
    togglePinFilter: (categoryId: string) => void;
    pinCategories: Array<{
        id: string;
        label: string;
        color: string;
    }>;
    
    // Props untuk Filter Tahun (BARU)
    selectedYear: string;
    setSelectedYear: (year: string) => void;
    availableYears: string[];
}

export const FilterPanel = ({
    activePinFilters,
    togglePinFilter,
    pinCategories,
    selectedYear,
    setSelectedYear,
    availableYears
}: FilterProps) => {
    const [collapsed, setCollapsed] = useState(false); // Default terbuka
    const [width, setWidth] = useState(240); // Lebar default

    // Logic untuk resize panel (tarik garis pinggir)
    const handleResize = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = width;

        const doDrag = (e: MouseEvent) => {
            // Karena panel ada di kanan, geser mouse ke kiri = lebar bertambah
            const newWidth = startWidth + (startX - e.clientX);
            // Batasi lebar minimal 200px dan maksimal 400px
            setWidth(Math.max(200, Math.min(400, newWidth)));
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    return (
        <div
            className={`absolute top-4 right-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden z-10 
            ${collapsed ? 'flex items-center justify-center' : ''}`}
            // Jika collapsed, ukurannya kecil. Jika tidak, ikuti state width.
            style={{ 
                width: collapsed ? '48px' : `${width}px`, 
                height: collapsed ? '48px' : 'auto',
                maxHeight: '80vh' // Agar tidak melebihi tinggi layar
            }}
        >
            {collapsed ? (
                // TAMPILAN SAAT DITUTUP (Hanya Ikon)
                <button
                    onClick={() => setCollapsed(false)}
                    className="w-full h-full flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Buka Filter"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            ) : (
                // TAMPILAN SAAT DIBUKA (Full Filter)
                <div className="flex flex-col h-full relative">
                    
                    {/* Handle Resize (Garis di kiri untuk ditarik) */}
                    <div
                        className="absolute left-0 top-0 h-full w-1.5 cursor-ew-resize hover:bg-indigo-500/50 transition-colors z-20 group"
                        onMouseDown={handleResize}
                    >
                         {/* Visual indicator titik tengah */}
                        <div className="absolute top-1/2 left-0.5 -translate-y-1/2 h-8 w-0.5 bg-gray-300 group-hover:bg-indigo-500 rounded-full" />
                    </div>

                    {/* Header Panel */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-2 pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-indigo-600">
                                <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                            </svg>
                            <h3 className="font-bold text-gray-800 text-sm">Filter Data</h3>
                        </div>
                        <button
                            onClick={() => setCollapsed(true)}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Konten Scrollable */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-5">
                        
                        {/* 1. FILTER TAHUN */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                                Tahun Panen
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <option value="all">Semua Tahun</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {/* Ikon Chevron Dropdown */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* 2. FILTER KOMODITAS */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                                Jenis Komoditas
                            </label>
                            <div className="space-y-1.5">
                                {/* Tombol Select All / Deselect All logic ada di parent, tombol ini representasi 'all' */}
                                <button
                                    onClick={() => togglePinFilter('all')}
                                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${
                                        activePinFilters.has('all')
                                            ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="w-2.5 h-2.5 rounded-full mr-3 bg-white border border-gray-300" />
                                    <span className="font-medium">Semua Komoditas</span>
                                </button>

                                {/* List Komoditas */}
                                {pinCategories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => togglePinFilter(category.id)}
                                        className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 border group ${
                                            activePinFilters.has(category.id)
                                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium shadow-sm'
                                                : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                        }`}
                                    >
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm`}
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="truncate flex-grow text-left">{category.label}</span>
                                        
                                        {activePinFilters.has(category.id) && (
                                            <svg className="w-4 h-4 text-indigo-600 flex-shrink-0 ml-2 animate-in fade-in zoom-in duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                    
                    {/* Footer / Status Info (Opsional) */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
                        Menampilkan data {selectedYear === 'all' ? 'semua tahun' : `tahun ${selectedYear}`}
                    </div>
                </div>
            )}
        </div>
    );
};