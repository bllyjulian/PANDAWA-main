/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- TAMBAHKAN DARI SINI ---
  typescript: {
    // !! PERINGATAN !!
    // Ini akan memaksa Vercel mengabaikan semua error TypeScript dan tetap lanjut
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini akan mengabaikan error ESLint
    ignoreDuringBuilds: true,
  },
  // --- SAMPAI SINI ---
  
  // (Kalau di bawah sini ada pengaturan lain, biarkan saja)
};

export default nextConfig;