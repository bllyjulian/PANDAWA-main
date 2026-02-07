import * as d3 from 'd3';

// Define pin interface
export interface PinData {
    id: string;
    position: [number, number];
    title: string;
    deskripsi?: string;
    population?: number;
    laju?: string;
    area?: string;
    komoditastertinggi?: string;
    produksikomoditas?: string;
    category: string;
    color?: string;
    gambar?: string;
    customIcon?: string;
}

// Define pin categories
export const pinCategories = [
    {
        id: 'all',
        label: 'Semua Kategori',
        color: '#EA4335',
        icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    },
    {
        id: 'padi',
        label: 'Padi',
        color: '#16a34a',
        icon: '/pins/iconPadi.png',
        type: 'image',
    },
    {
        id: 'jagung',
        label: 'Jagung',
        color: '#facc15',
        icon: '/pins/iconJagung.png',
    },
    {
        id: 'ubi',
        label: 'Ubi Kayu',
        color: '#a16207',
        icon: '/pins/ubi.png',
    },
    {
        id: 'kelapa',
        label: 'Kelapa',
        color: '#10b981',
        icon: '/pins/kelapa.png',
    },
    {
        id: 'kopi',
        label: 'Kopi',
        color: '#6b3e26',
        icon: '/pins/kopi.png',
    },
];

// Function to create pins on the map
export const createPins = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    pins: PinData[],
    activePinFilters: Set<string>,
    showPins: boolean,
    containerRef: React.RefObject<HTMLDivElement>,
    onPinClick: (pin: PinData) => void, // Kita ganti namanya biar jelas ini callback
    zoom: d3.ZoomBehavior<Element, unknown>
) => {
    // Remove existing pins to avoid duplicates
    g.select(".pin-group").remove();

    // Create a group for pins
    const pinGroup = g.append("g")
        .attr("class", "pin-group")
        .style("display", showPins ? "block" : "none");

    // Add pins
    const pinElements = pinGroup.selectAll(".pin")
        .data(pins)
        .enter()
        .append("g")
        .attr("class", d => `pin pin-${d.id}`)
        .attr("data-category", d => d.category)
        .attr("transform", d => `translate(${d.position[0]}, ${d.position[1]})`)
        .style("cursor", "pointer")
        .style("display", d => {
            const showAll = activePinFilters.has('all');
            return showAll || activePinFilters.has(d.category) ? "block" : "none";
        });

    // Tambahkan isi pin
    pinElements.each(function (d) {
        const pin = d3.select(this);
        const category = pinCategories.find(cat => cat.id === d.category) || pinCategories[0];

        pin.attr("data-color", d.color || category.color);
        pin.attr("data-icon", d.customIcon || category.icon);

        // Drop shadow defs (sama seperti sebelumnya)
        const defs = pin.append("defs");
        const filter = defs.append("filter")
            .attr("id", `drop-shadow-${d.id}`)
            .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
        filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 0.5).attr("result", "blur");
        filter.append("feOffset").attr("in", "blur").attr("dx", 0).attr("dy", 0.5).attr("result", "offsetBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "offsetBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        pin.append("circle")
            .attr("class", "pin-circle")
            .attr("cx", 0).attr("cy", 0).attr("r", 10) // Ukuran default lebih kecil sedikit biar rapi
            .attr("fill", d.color || category.color)
            .attr("stroke", "white")
            .attr("stroke-width", 1.5)
            .attr("filter", `url(#drop-shadow-${d.id})`);

        pin.append("image")
            .attr("class", "pin-icon")
            .attr("x", -6).attr("y", -6)
            .attr("width", 12).attr("height", 12)
            .attr("xlink:href", category.icon);

        // Tooltip sederhana (bubble)
        const fo = pin.append("foreignObject")
            .attr("x", -40).attr("y", -35)
            .attr("width", 80).attr("height", 40)
            .style("overflow", "visible")
            .style("pointer-events", "none")
            .attr("class", "pin-bubble")
            .style("opacity", 0);

        fo.append("xhtml:div")
            .style("background", "white")
            .style("border", "1px solid #ccc")
            .style("border-radius", "8px")
            .style("padding", "4px 8px")
            .style("text-align", "center")
            .style("font-size", "10px")
            .style("color", "#333")
            .style("white-space", "nowrap")
            .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
            .text(d.title);
    });

    // Event Listeners
    pinElements
        .on("mouseover", function () {
            d3.select(this).raise(); // Bawa ke paling depan
            d3.select(this).selectAll("circle")
                .transition().duration(200)
                .attr("r", 14) // Membesar saat hover
                .attr("stroke-width", 2);

            d3.select(this).select(".pin-bubble")
                .transition().duration(200)
                .style("opacity", 1)
                .style("transform", "translateY(-5px)");
        })
        .on("mouseout", function () {
            d3.select(this).selectAll("circle")
                .transition().duration(200)
                .attr("r", 10) // Kembali ke ukuran semula
                .attr("stroke-width", 1.5);

            d3.select(this).select(".pin-bubble")
                .transition().duration(200)
                .style("opacity", 0)
                .style("transform", "translateY(0px)");
        })
        .on("click", function (event, d) {
            // PENTING: Stop event agar tidak menembus ke peta (map reset)
            event.stopPropagation();
            
            // Panggil fungsi handlePinSelect dari Map.tsx
            // Biarkan Map.tsx yang menghitung koordinat tengah dan melakukan zoom
            if (onPinClick) {
                onPinClick(d); 
            }
        });
};

// Function to update pin visibility based on filters
export const updatePinVisibility = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null,
    filters: Set<string>,
    showPins: boolean
) => {
    if (!svg) return;
    const showAll = filters.has('all');

    svg.selectAll("g.pin")
        .style("display", function (d: any) {
            if (!showPins) return "none";
            return showAll || filters.has(d.category) ? "block" : "none";
        });
    
    // Pastikan container utama juga terlihat
    svg.select(".pin-group").style("display", showPins ? "block" : "none");
};

// Function to reset pins visual state
export const resetPins = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null
) => {
    if (!svg) return;
    svg.selectAll("g.pin").each(function () {
        const pin = d3.select(this);
        const originalColor = pin.attr("data-color");
        
        pin.select(".pin-circle")
            .transition().duration(300)
            .attr("fill", originalColor)
            .attr("r", 10); // Reset radius juga
    });
};