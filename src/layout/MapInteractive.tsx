'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { type PinData, createPins, updatePinVisibility, pinCategories, resetPins } from '../components/map/PinsSebaran';
import { Controls, calculateZoomTransform, calculatePathBounds } from '../components/map/ZoomControls';
import { Sidebar } from './MapSidebar';

import { KecamatanDetail, hideKecamatanInfo } from '../components/map/KecamatanDetails';
import { FilterPanel } from '../components/map/FilterSebaran';
import { InfoPanel } from '../components/map/InfoSebaran';
import Image from "next/image";


import { dataKomoditas } from '@/data/komoditas';

interface KecamatanData {
    name: string;
    path: string;
    center: [number, number];
    defaultColor?: string;
    area: string | number;
    population: string | number;
}

// Enhanced pin data structure with all necessary fields
export interface EnhancedPinData extends PinData {
    id_panen: string;
    position: [number, number];
    category: string;
    name?: string;
    title?: string;
    luaspanen?: string;
    produksi?: string;
    produktivitas?: string;
    kec?: string;
}

const staticKecamatan = [
    {
        id_kecamatan: 1,
        name: "Binakal",
        path: "M262.77 393.327h3.12v.24h2.88l1.92.24 1.92.24h1.92l2.16.24.48-.24h1.44l1.199-.24h1.92l1.2-.24.72.24h1.92v.24h-.48l-.24.24v.96h.48l.48.24v.24l.24.48v.48l.24.24.48.48h.24l.48.72.48.72.48.48.239.48.24.24.48.72v.959l-.24.24h.24v.24h.96v-.96l.24-.24h.48l.48.24.48.72.24.48.24.24v.72l.24.24.48.24.48.24.24.24.24.24v.48h.72l.24.24.24.24v.96l-.24.24-.48.24v.48l.24.24v.48l-.24.48v.24h.24l.48.24h.72l.24.24v.24l-.24.24-.24.48h-.24l-.24.24v.24l-.24.24v1.2l-.24.24v.239l-.24.48.24.24.24.72v.96l.24.72.48 1.2v1.92l-.48 1.2-.24.48-.24.48h-.24v.48l-.24.24-.24.24.24.24h-.24v.24h-.24v.24l-.24.24v.24h-.24v.24h-.24v.48l-.24.24v.719h-.24l.24.24-.24.24-.24.48v.96h-.24v.24l-.24.24v.48l.24.48v.24h-.24v1.2l-.24.24.24.24-.24.24v.24l-.24.72v.24l-.24.48h-.24l-.24.24v.48l.24.24-.24.48.24.72v1.44l-.24.24v.479h-.24l-.24.24h-.24v.24h-.24v.24h-.24v.96h-.24v.24l-.24-.24h-.72v.24h-.24v.24h-.24v.24h-.48v-.24h-.96v-.48h-.24v-.24h-1.68l.24.24v.48l-.24.72.48.48.48.48.24.24v1.92l-.24.24v1.2l-.24.24v.72l-.24.48v.48h.48v.48l.24.24h.24v.48h.24v.48h-.24l-.24.24-.24.479h-.24l-.24.24-.48-.24h-.48v.72h-.48l-.72-.24-.48.24-.96.24-.24.24-.24-.24h-.24v-.48l-.24-.24h-.479l-.24-.48h-.48l-1.2.24-.72.24h-1.2l-.24-.24h-.96l-.48.24-.48.24h-.48l-.48.24h-1.68l-.239-.24-.24-.24-.96-.24-.24-.24-.24.24-.48.24v.24l-.24.24v1.44l.24.24-.24.24h-.48l-.72-.24h-.72v.24h-.24v.24l-.48.24-.48.24-.48.24h-1.2l-.48-.24-.72-.24-1.199.24h-.24l-1.2.24-1.44.48-.72.48-.72.24.24.24v.24l-.24.24-.24.48h-.24l-.72.48-.24.24-.24.24v.24l.24.72v.72l-.24.24h-.24l-.48.24h-.72l-.72.24h-.239l-.48.24-.24.48-.96.72-.48.48-.24.24h-.48l-1.2-.48h-.24l-.24.24h-.48l-.24.24h-1.44l-.48.239-.24.24h-.24l-.96.72-.479.24-.48.24-.48.24-.72.48-.24.24-.48.48-.48.48-.48.24-.48.24-.72.24-.24.48-.48.48-.48.24-.24.48-.48.48-.48.48-.48.48-.48.48-.48.24-.48.24h-.479l-.48.48h-1.68l-.48.24v.24l-.24.48-.48.48v.24l-.48.24v.24l-.48.24-.24.48-.24.24-.24.239-.24.48v.24l-.24.48-.24.24-.24.24h-1.2l-.48.24h-.24l-.24.24h-.24l-.239.24-.24.24-.48.24-.72.24h-1.2l-.48.24-.24.24-.48.72-.72.48-.96.96-.96 1.2-1.2.96-1.2.96-1.199 1.2-.24.24-.96.72-.96 1.199h-.24l-.96.96-.48.48h-.24l-.24.24-.24.24-.24.24-.24.48-.24.48-.48.24v.24l-.72.48-.48.48h-.48l-.48.24-1.199.24-.48.24h-.48l-.48.24-.24-.24h-.24v.24h-.24l-.24-.24h-.48l-.72-.24-.72-.24-.72-.24-.96-.24h-1.68l-.719.24-.48.24-.48.48-.48.72-.48.72-.72.96-.48.72-.48.72-.24.48-.72.24-.96.48-1.2.24-1.2.24-.719.24-1.2.479-.96.48-.96.72-.48.48-.48.48-.24.72-.48.96-.24.96-.24.96-.48.72-.24.72-.72.72-.72.72-.72.72-.48.96-.719.96-.48.959-.48.96-.24.72-.96.72-.72.72-.96.72-.96.72-1.44.72-.96.72-1.439.72-.48.24-1.44.48-1.44.24-1.68.48-1.92.24-.72.24h-.24l-.24.24h-.24l-.24.24h-.24l-.239.24h-.24l-.48.24-.24.24h-.48l-.24.24-.24.24-.48.24h-.24l-.24.24-.24.24h-.48v.239h-.24l-.24.24v.24h-.24l-.24.24-.24.24h-.24v.24h-.24l-.24.24h-.96l-.48.24-.72.48-1.199.72-1.44.48-1.2.24-.48-.24h-.72l-1.2-.48-.96-.48-1.2-.72-.72-.24H144.705l-.96.24-.96.48-.48.24-.96.72-.72.48-.48.48-.24.24-.24.24v.24l-.24.24-.24.24h-.72l-.96.24h-.24l-.24.24h-.24l-.24.24v.24h-.24v.24l-.24.24-.239.24-.24.24v.24l-.24.24-.24.48-.24.24-.24.24-.24.48-.24.48v.24l-.48.48-.24.72-.72.719-.48.96.24-1.2.24-1.2.24-.72v-.24h.24l.48-1.44.48-1.2.48-1.44.48-1.2.24-.48.72-1.2.24-1.2.48-1.439.72-.96.48-1.2 1.2-1.44v-.24l.96-1.2.96-.96 1.2-.96 1.2-1.2v-.24l1.199-.96.96-.72.96-.48.96-.479.24-.24 1.2-.24.72-.24 1.2-.48 1.2-.48 1.679-.72 1.2-.96 1.2-.96 1.2-.96.96-1.2 1.44-1.68.72-.96.96-.96.959-.96.48-.719.72-.96 1.2-1.2.96-1.2.96-1.2.96-1.2.96-.96.48-.72.48-.72.24-.96.24-.48v-.48l.48-.48.479-.48.24-.24v-.719l-.24-.72v-.48l.24-.72 1.2-2.88.24-.72.24-.24.24-.72.48-.48.24-.48h.24l.48-.24v-.24l.72-.72v-.24l.48-.72.24-.48.48-.48.24-.24.24-.479v-.24l.48-.48.24-.24.24-.48.48-.24.72-.24h.959l.72-.24.48-.24.96.24h.24l.24-.24.24-.24.48-.96v-.24l.24-.48.72-1.2.24-.24.24-.48.96-1.2.96-1.44h.24l.96-1.2v-.24h.24l.24-.24.719-.96.24-.479.24-.24.72-.72.72-.96v-.24l.96-.72.72-.72.24-.48.72-.72.96-.72.24-.48.72-.48.24-.24.24-.24.72-.72h.24l.72-.72h.239l.72-.48h.24l.24-.24.24-.24.48-.24h.24l.24-.24.24-.24.24-.24.72-.72v-.24h.24v-.24l.24-.239v-.24l.48-.96.24-.24.48-.96.48-.96v-.24l.48-.72.48-.24v-.24l.24-.24.24-.24h1.2l.48.24h.719l.48-.24.48-.24.72-.96.24-.24.48-1.68.24-2.16.48-1.199.24-.72v-.48l.24-.96v-1.44l.48-1.2v-1.2l.24-.96V426.924l.24-.72.72-.959v-1.2l.48-.48v-.72l.48-.72.96-.48h2.399l.72.48.72.48H221.496l.72-.24.24-.24.72.24.24.24.24.24h.96l.719-.24h.48l.48.24h.24v-.24h.24l.72-.48.48-.48.24-.24v-.24l.24-.48.48-.48.24-.24.48-.24h1.44l.24-.24.48-.48.24-.24.24-.48h.24v-.24h1.2l.24-.24.479-.24h.72l.24-.24.48-.24.24-.24.24-.24h1.92l.96.24.48.24.96.48.24.24.24.24.48.96.48.72v.48l-.24.48v1.2l-.24.24h-.24l-.24.24-.24.24.24.24v1.68h.24l.24.24.48.24.24.48v.24h.959l.48-.24.72-.48h.24l.48.24.48.24h.24l.48.24.48-.24h.24l.24-.24v-.24l.24-.48V421.884h.24l.24-.96.24-.96.96-.72.72-.24.72.24 1.44.96.239.24h.48l.96-.24h.72l.24-.24v-.24l.48-.72.48-.96.48-.72v-.72l-.24-.24-.72-.24-.24-.24v-.24l.24-.96.48-1.679.96-2.64-.24-.24-.48-.48-1.44.72-.96-.24v-.72h-.96v-1.92l.24-.72.48-.96.72-.72v-.24l.24-2.4.24-.24v-.959l.24-.96.48-2.4v-.48l.48-1.68.72-.24.24-.24 1.68-.72h.24l.24-.24.48-.96h1.44l.719-.24.24-.24h.24l.24.24.48.24z",
        center: [230, 450],
        defaultColor: "#2E8B57",
        produksikomoditas: "11.842",
      },
   
  ];
  
export function Map() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const [selectedKecamatan, setSelectedKecamatan] = useState<KecamatanData | null>(null);
    
    const [komoditasData, setKomoditasData] = useState<EnhancedPinData[]>([]);
    
    // Pin related states
    const [pins, setPins] = useState<PinData[]>(dataKomoditas);
    const [activePinFilters, setActivePinFilters] = useState<Set<string>>(new Set(['all']));
    const [selectedPin, setSelectedPin] = useState<EnhancedPinData | null>(null);
    const [showPins, setShowPins] = useState(true);

    // Check if we're in the browser environment
    const [isBrowser, setIsBrowser] = useState(false);

    const mapInstanceRef = useRef({
        svg: null as d3.Selection<SVGSVGElement, unknown, null, undefined> | null,
        g: null as d3.Selection<SVGGElement, unknown, null, undefined> | null,
        zoom: null as d3.ZoomBehavior<Element, unknown> | null,
        paths: null as d3.Selection<d3.BaseType, KecamatanData, SVGGElement, unknown> | null,
        mapBounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    });

    // Check if Kecamatan data is available
    const [kecamatanData, setKecamatanData] = useState<KecamatanData[]>([]);
    
    const [mapError, setMapError] = useState<string | null>(null);

    // Add this useEffect to check if we're in browser
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        async function fetchAndMerge() {
          try {
            const res = await fetch('/api/kecamatan');
            const apiData = await res.json();
      
            const merged = staticKecamatan.map(kec => {
              const found = apiData.find((item: any) => item.id_kecamatan === kec.id_kecamatan);
      
              return {
                ...kec, // path, center, defaultColor
                title: found?.nama_kecamatan || `Kecamatan ${kec.id_kecamatan}`,
                gambar: found?.gambar || null,
                deskripsi: found?.deskripsi || "-",
                area: found?.area || "-",
                population: found?.jumlah_penduduk || Math.floor(Math.random() * 10000),
                laju: found?.laju_pertumbuhan || (Math.random() * 2).toFixed(2) + '%',
                komoditastertinggi: found?.nama_komoditas
                ? (found.produksikomoditas 
                    ? `${found.nama_komoditas} (${found.produksikomoditas})`
                    : `${found.nama_komoditas}`)
                : "-",
              
              };
            });
      
            setKecamatanData(merged);
          } catch (err) {
            console.error('Gagal ambil data:', err);
            setKecamatanData(staticKecamatan); // fallback
          }
        }
      
        fetchAndMerge();
      }, []);

    useEffect(() => {
        if (containerRef.current) {
            const timer = setTimeout(() => {
                setContainerDimensions({
                    width: containerRef.current!.clientWidth,
                    height: containerRef.current!.clientHeight
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isSidebarOpen]);

    // New effect to close pin info panel when sidebar opens
    useEffect(() => {
        if (isSidebarOpen) {
            setSelectedPin(null);
        }
    }, [isSidebarOpen]);

    useEffect(() => {
        async function fetchPanen() {
          try {
            const res = await fetch('/api/map');
            const hasilPanen = await res.json();
            
            // Convert dataKomoditas to accurate EnhancedPinData objects
            const enhanced = dataKomoditas.map((pin) => {
              // Find the matching data from API
              const match = hasilPanen.find((data) => 
                // Match based on id_panen pattern (e.g., "jagung-binakal")
                // Assuming id_panen in the database contains the combination of komoditas and kecamatan names
                data.id_panen === pin.id_panen ||
                // As fallback, try to match by checking if the position/komoditas match
                (data.nama_komoditas?.toLowerCase() === pin.category && 
                 pin.id_panen?.includes(data.nama_kecamatan?.toLowerCase()))
              );
              
              if (match) {
                console.log("Found matching data:", match);
                return {
                  id_panen: pin.id_panen,
                  position: pin.position,
                  category: pin.category,
                  name: match.nama_komoditas,
                  title: match.nama_komoditas || pin.title || pin.category,
                  luaspanen: match.luas_panen?.toString() || "-",
                  produksi: match.produksi?.toString() || "-", 
                  produktivitas: match.produktivitas?.toString() || "-",
                  kec: match.nama_kecamatan || pin.id_panen.split('-')[1] || "Unknown",
                  komoditastertinggi: match.produksi ? `${match.nama_komoditas} (${match.produksi} ton)` : "-"
                
                };
              } else {
                // Fallback data with clear indication it's not found
                console.warn(`No data found for pin: ${pin.id_panen}`);
                return {
                  id_panen: pin.id_panen,
                  position: pin.position,
                  category: pin.category,
                  name: pin.category,  // Use category as name for fallback
                  title: pin.title || `${pin.category} (No Data)`,
                  luaspanen: "-",
                  produksi: "-",
                  produktivitas: "-",
                  kec: pin.id_panen.split('-')[1] || "Unknown"
                };
              }
            });
            
            setKomoditasData(enhanced);
            console.log("Enhanced komoditas data:", enhanced);
          } catch (err) {
            console.error("Gagal ambil data hasil panen:", err);
            // Set fallback data with clear indication it's fallback
            const fallback = dataKomoditas.map(pin => ({
              ...pin,
              id_panen: pin.id_panen,
              position: pin.position,
              category: pin.category,
              name: pin.category,
              title: pin.title || `${pin.category} (Data Tidak Tersedia)`,
              luaspanen: "-",
              produksi: "-", 
              produktivitas: "-",
              kec: pin.id_panen.split('-')[1] || "Unknown"
            }));
            setKomoditasData(fallback);
          }
        }
        
        fetchPanen();
      }, []);

    const togglePinFilter = (categoryId: string) => {
        const newFilters = new Set(activePinFilters);

        if (categoryId === 'all') {
            if (newFilters.has('all')) {
                newFilters.clear();
            } else {
                newFilters.clear();
                newFilters.add('all');
            }
        } else {
            newFilters.delete('all');
            if (newFilters.has(categoryId)) {
                newFilters.delete(categoryId);
            } else {
                newFilters.add(categoryId);
            }

            if (newFilters.size === 0) {
                newFilters.add('all');
            }
        }

        setActivePinFilters(newFilters);
        updatePinVisibility(mapInstanceRef.current.svg, newFilters, showPins);
    };

    const toggleAllPins = () => {
        const newShowPins = !showPins;
        setShowPins(newShowPins);

        if (mapInstanceRef.current.svg) {
            mapInstanceRef.current.svg.selectAll(".pin-group")
                .style("display", newShowPins ? "block" : "none");
            updatePinVisibility(mapInstanceRef.current.svg, activePinFilters, newShowPins);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSelectKecamatan = (kecamatan: KecamatanData) => {
        if (!mapInstanceRef.current.svg || !mapInstanceRef.current.paths) return;

        mapInstanceRef.current.paths
            .transition()
            .duration(300)
            .style("fill", d => d.defaultColor || "white");

        const selectedPath = mapInstanceRef.current.paths.filter(d => d.name === kecamatan.name);
        if (selectedPath.size() > 0) {
            selectedPath
                .transition()
                .duration(300)
                .style("fill", "#CCEEDB");

            setSelectedKecamatan(kecamatan);
            setSelectedPin(null);
            zoomToKecamatan(kecamatan);
        }
    };
// Fungsi baru untuk zoom ke titik spesifik (Pin)
const zoomToPin = (x: number, y: number) => {
    const { svg, zoom } = mapInstanceRef.current;
    if (!svg || !zoom || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const scale = 4; // Atur level zoom yang diinginkan (makin besar makin dekat)

    // Rumus D3 untuk menaruh titik (x,y) tepat di tengah layar
    const transform = d3.zoomIdentity
        .translate(containerWidth / 2, containerHeight / 2)
        .scale(scale)
        .translate(-x, -y);

    svg.transition()
        .duration(750) // Durasi animasi
        .call(zoom.transform, transform);
};
    const zoomToKecamatan = (kecamatan: KecamatanData) => {
        const { svg, zoom } = mapInstanceRef.current;
        if (!svg || !zoom || !containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        if (!kecamatan || !kecamatan.path) {
            console.error('Invalid kecamatan data for zoom:', kecamatan);
            return;
        }

        const bounds = calculatePathBounds(kecamatan.path, kecamatan.center);

        if (!bounds || typeof bounds !== 'object' ||
            isNaN(bounds.minX) || isNaN(bounds.maxX) ||
            isNaN(bounds.minY) || isNaN(bounds.maxY)) {
            console.error('Invalid bounds for zoom:', bounds);
            return;
        }

        const transform = calculateZoomTransform(
            containerWidth,
            containerHeight,
            bounds
        );

        if (!transform || isNaN(transform.x) || isNaN(transform.y) || isNaN(transform.k)) {
            console.error('Invalid transform:', transform);
            return;
        }

        svg.transition()
            .duration(750)
            .call(zoom.transform, transform);
    };

    const resetView = () => {
        const { svg, zoom, g, mapBounds } = mapInstanceRef.current;
        if (!svg || !zoom || !containerRef.current) return;

        // Reset seleksi
        setSelectedPin(null);
        setSelectedKecamatan(null);

        // Reset warna kecamatan
        g!.selectAll("path")
            .transition()
            .duration(300)
            .style("fill", d => (d as any).defaultColor || "white");

        resetPins(svg);

        // Update visibilitas pin
        updatePinVisibility(svg, activePinFilters, showPins);

        // Kembalikan zoom ke posisi awal
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const initialTransform = calculateZoomTransform(
            containerWidth,
            containerHeight,
            mapBounds
        );
        svg.transition().call(zoom.transform, initialTransform);
    };

    // Modified function to handle pin selection
// Modified function to handle pin selection
const handlePinSelect = (pin: { id_panen: string }) => {
    console.log("Pin selected:", pin.id_panen);
    
    // Cari data lengkap pin
    const detail = komoditasData.find((k) => k.id_panen === pin.id_panen);
    
    if (detail) {
        setSelectedPin(detail);
        // Pastikan kecamatan tidak terpilih agar tidak bentrok
        setSelectedKecamatan(null);
        setIsSidebarOpen(false);

        // --- BAGIAN PENTING YANG DITAMBAHKAN ---
        // Ambil koordinat pin dan lakukan zoom
        if (detail.position) {
            zoomToPin(detail.position[0], detail.position[1]);
        }
        // ---------------------------------------

    } else {
        console.warn(`No matching komoditas data found for pin ${pin.id_panen}`);
    }
};

    useEffect(() => {
        if (mapInstanceRef.current.svg && containerDimensions.width && containerDimensions.height) {
            mapInstanceRef.current.svg
                .attr("width", containerDimensions.width)
                .attr("height", containerDimensions.height)
                .attr("viewBox", [0, 0, containerDimensions.width, containerDimensions.height]);
        }
    }, [containerDimensions]);

    useEffect(() => {
        // Don't run on server side
        if (!isBrowser || !kecamatanData.length || mapError) return;

        const createMap = () => {
            try {
                if (!containerRef.current || !svgRef.current) {
                    console.error("SVG reference is not ready");
                    return;
                }

                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;

                if (!containerWidth || !containerHeight) {
                    console.error("Invalid container dimensions:", containerWidth, containerHeight);
                    return;
                }

                setContainerDimensions({ width: containerWidth, height: containerHeight });
                d3.select(svgRef.current).selectAll("*").remove();

                const svg = d3.select(svgRef.current)
                    .attr("viewBox", [0, 0, containerWidth, containerHeight])
                    .attr("width", containerWidth)
                    .attr("height", containerHeight)
                    .style("background", "#f8fafc");

                mapInstanceRef.current.svg = svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>;

                svg.append("rect")
                    .attr("width", containerWidth)
                    .attr("height", containerHeight)
                    .attr("fill", "#f9fafb");

                const g = svg.append("g");
                mapInstanceRef.current.g = g as unknown as d3.Selection<SVGGElement, unknown, null, undefined>;

                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

                kecamatanData.forEach(kecamatan => {
                    const pathPoints = kecamatan.path.match(/[0-9]+,[0-9]+/g);
                    if (pathPoints) {
                        pathPoints.forEach(point => {
                            const [x, y] = point.split(',').map(Number);
                            minX = Math.min(minX, x);
                            maxX = Math.max(maxX, x);
                            minY = Math.min(minY, y);
                            maxY = Math.max(maxY, y);
                        });
                    }
                });

                const padding = 100;
                minX -= padding;
                minY -= padding;
                maxX += padding;
                maxY += padding;

                mapInstanceRef.current.mapBounds = { minX, maxX, minY, maxY };

                const zoom = d3.zoom<SVGSVGElement, unknown>()
                    .scaleExtent([0.5, 8])
                    .extent([[0, 0], [containerWidth, containerHeight]])
                    .on("zoom", (event) => {
                        g.attr("transform", event.transform);
                        g.selectAll("path").attr("stroke-width", 1 / event.transform.k);
                        g.selectAll("text.kecamatan-label").attr("font-size", `${10 / event.transform.k}px`);

                        // 🔥 Tambahan ini agar pin ikut membesar/menciut
                        g.selectAll<SVGGElement, any>(".pin")
                            .attr("transform", function (d) {
                                const [x, y] = d?.position || [0, 0];
                                const scale = 1 / event.transform.k;
                                return `translate(${x}, ${y}) scale(${scale})`;
                            });

                    });


                mapInstanceRef.current.zoom = zoom;

                svg.call(zoom)
                    .call(zoom.translateTo, (minX + maxX) / 2, (minY + maxY) / 2)
                    .on("dblclick.zoom", null);

                svg.on("dblclick", resetView);

                const defs = svg.append("defs");

                const pattern = defs.append("pattern")
                    .attr("id", "grid-pattern")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("patternUnits", "userSpaceOnUse");

                pattern.append("rect")
                    .attr("width", 20)
                    .attr("height", 20)
                    .attr("fill", "#f9fafb");

                pattern.append("path")
                    .attr("d", "M 20 0 L 0 0 0 20")
                    .attr("fill", "none")
                    .attr("stroke", "#e5e7eb")
                    .attr("stroke-width", 1);

                svg.select("rect")
                    .attr("fill", "url(#grid-pattern)");

                const clicked = (event: any, d: KecamatanData) => {
                    event.stopPropagation();

                    g.selectAll("path")
                        .transition()
                        .duration(300)
                        .style("fill", (kec: any) => kec.defaultColor || "white");

                    d3.select(event.currentTarget)
                        .transition()
                        .duration(300)
                        .style("fill", "#606060");

                    setSelectedKecamatan(d);
                    setSelectedPin(null);

                    const bounds = calculatePathBounds(d.path, d.center);

                    const transform = calculateZoomTransform(
                        containerWidth,
                        containerHeight,
                        bounds
                    );

                    svg.transition()
                        .duration(750)
                        .call(zoom.transform, transform);
                };

                const paths = g.selectAll<SVGPathElement, KecamatanData>("path")
                    .data(kecamatanData)
                    .enter()
                    .append("path")
                    .attr("d", d => d.path)
                    .attr("fill", d => d.defaultColor || "#5b9bd5")
                    .attr("stroke", "#0B3000")
                    .attr("stroke-width", 0.5)
                    .style("cursor", "pointer")
                    .style("transition", "fill 0.3s ease")
                    .on("click", clicked)
                    .on("mouseover", function () {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("opacity", 0.85);
                    })
                    .on("mouseout", function () {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("opacity", 1);
                    });

                mapInstanceRef.current.paths = paths as unknown as d3.Selection<d3.BaseType, KecamatanData, SVGGElement, unknown>;

                g.selectAll("text")
                    .data(kecamatanData)
                    .enter()
                    .append("text")
                    .attr("class", "kecamatan-label")
                    .attr("x", d => d.center[0])
                    .attr("y", d => d.center[1])
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("fill", "white")
                    .attr("font-size", "10px")
                    .attr("font-weight", "bold")
                    .attr("pointer-events", "none")
                    .style("text-shadow", "0px 0px 3px rgba(0,0,0,0.6)")
                    .text(d => d.name);

                // Create pins using the imported function, but pass the modified handler
                createPins(
                    svg,
                    g,
                    pins,
                    activePinFilters,
                    showPins,
                    containerRef,
                    handlePinSelect, // Use the new handler that also closes sidebar
                    zoom
                );

                const initialTransform = calculateZoomTransform(
                    containerWidth,
                    containerHeight,
                    { minX, maxX, minY, maxY }
                );

                initialTransform.x += 230;
                initialTransform.y -= 150;

                svg.call(zoom.transform, initialTransform);

            } catch (error: any) {
                console.error("Error creating map:", error);
                setMapError(`Error creating map: ${error.message}`);
            }
        };

        const timer = setTimeout(() => {
            createMap();
        }, 100);

        const handleResize = () => {
            createMap();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [kecamatanData, isBrowser]);

    useEffect(() => {
        if (!isBrowser) return;
        updatePinVisibility(mapInstanceRef.current.svg, activePinFilters, showPins);
    }, [activePinFilters, showPins, isBrowser]);

    useEffect(() => {
        if (!isBrowser || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.on("click", (event) => {
            // Hanya trigger jika mengklik langsung pada SVG (bukan elemen child)
            if (event.target === svg.node()) {
                setSelectedPin(null);
                setSelectedKecamatan(null);
            }
        });

        return () => {
            svg.on("click", null);
        };
    }, [isBrowser]);

    // Debug logging for selectedPin changes
    useEffect(() => {
        console.log("Selected pin changed:", selectedPin);
    }, [selectedPin]);

    return (
        <div className="relative w-full h-screen">
            
            <Sidebar
                onSelectKecamatan={handleSelectKecamatan}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <Image
            src="/images/detailmap/detail.png"
            alt="Grid"
            height={180}
            width={0}
            unoptimized
            className="fixed bottom-4 left-[80px] w-auto h-[180px]"
            />


            <div
                ref={containerRef}
                className={`h-full transition-all duration-300`}
                
            >
                
                {mapError ? (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-bold text-red-600 mb-4">Map Error</h2>
                            <p className="text-gray-700">{mapError}</p>
                            <p className="mt-4 text-gray-600">Check console for more details</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <svg
                            ref={svgRef}
                            className={`w-full h-full`}
                        ></svg>

                        {isBrowser && mapInstanceRef.current.svg && (
                            <>
                                <FilterPanel
                                    activePinFilters={activePinFilters}
                                    togglePinFilter={togglePinFilter}
                                    pinCategories={pinCategories}
                                />

                                {selectedKecamatan && (
                                    <InfoPanel
                                        pin={selectedKecamatan}
                                        onClose={() => setSelectedKecamatan(null)}
                                        pinCategories={pinCategories}
                                    />
                                )}

                                {!selectedKecamatan && selectedPin && mapInstanceRef.current.svg && (
                                    <KecamatanDetail
                                        containerWidth={containerDimensions.width}
                                        containerHeight={containerDimensions.height}
                                        kecamatan={selectedPin}
                                        svg={mapInstanceRef.current.svg}
                                    />
                                )}

                            </>
                        )}

                        {isBrowser && mapInstanceRef.current.svg && mapInstanceRef.current.zoom && (
                            <Controls
                                svg={mapInstanceRef.current.svg}
                                zoom={mapInstanceRef.current.zoom}
                                containerWidth={containerDimensions.width}
                                containerHeight={containerDimensions.height}
                                resetView={resetView}
                            />
                        )}
                    </>
                )}

            </div>
        </div>
        
    );
}