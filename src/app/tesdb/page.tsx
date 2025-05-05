'use client';

import { useEffect, useState } from 'react';

export default function MapPage() {
  const [kecamatan, setKecamatan] = useState([]);

  useEffect(() => {
    fetch('/api/penduduk')
      .then(res => res.json())
      .then(data => setKecamatan(data));
  }, []);

  return (
    <div>
      <h1>Daftar Kecamatan</h1>
      <ul>
        {kecamatan.map((k: any) => (
          <li key={k.id_penduduk}>
            {k.nama_kecamatan} - {k.jml_penduduk}
          </li>
        ))}
      </ul>
    </div>
  );
}
