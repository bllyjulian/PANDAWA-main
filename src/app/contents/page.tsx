'use client'; // <--- TAMBAHKAN INI DI BARIS PALING ATAS

import React from 'react';
// import Image from 'next/image'; // Opsional jika pakai Next.js

export default function HomePage() {

  // Data Komoditas
  const commodityData = [
    { nama: 'Jagung', jumlah: '166.046 ton', color: '#FF3448' },
    { nama: 'Padi', jumlah: '464.766 ton', color: '#FF3448' },
    { nama: 'Tembakau', jumlah: '4.500 ton', color: '#FF3448' },
  ];

  // Data Instansi Terkait
  const agencies = [
    { name: 'Komdigi', desc: 'Pengelolaan infrastruktur teknologi informasi dan digitalisasi sistem.', logo: 'images/logo/komdigi-logo.jpg' },
    { name: 'BPS Bondowoso', desc: 'Data statistik potensi sumber daya alam dan hasil pertanian daerah.', logo: 'images/logo/bps-logo.jpg' },
    { name: 'Dinas Pertanian', desc: 'Monitoring dan pemetaan hasil pertanian Kabupaten Bondowoso.', logo: 'images/logo/disper-logo.jpg' },
    { name: 'Bappeda', desc: 'Pemanfaatan data geospasial untuk perencanaan pembangunan daerah.', logo: 'images/logo/bappeda-logo.jpg' },
  ];

  return (
    <>
      {/* Header */}
      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo */}
                <a href="index.html" className="logo">
                  <h4>PAN<span>DAWA</span></h4>
                </a>
                
                {/* Menu */}
                <ul className="nav">
                  <li className="scroll-to-section"><a href="#top" className="active">Beranda</a></li>
                  <li className="scroll-to-section"><a href="#about">Tentang Kami</a></li>
                  <li className="scroll-to-section"><a href="#services">Layanan</a></li>
                  <li className="scroll-to-section"><a href="#portfolio">Instansi Terkait</a></li>
                  <li className="scroll-to-section"><a href="#contact">Kontak Kami</a></li> 
                  <li>
                    <div className="main-red-button"><a href="/map">Sebaran SDA</a></div>
                  </li> 
                </ul>        
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner */}
      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <h6>Selamat Datang di PANDAWA</h6>
                    <h2>Visualisasi<em> Interaktif untuk </em><span>Kebijakan di </span>Bondowoso</h2>
                    <p>Menggunakan teknologi GIS untuk menyusun kebijakan berbasis data, mengintegrasikan informasi dari berbagai sektor, dan meningkatkan efisiensi pemantauan lingkungan di Kabupaten Bondowoso.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img src="assets/images/bwsmap.png" alt="Peta Bondowoso Visualisasi" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="left-image wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <img src="assets/images/about-left-image.png" alt="Tentang PANDAWA" />
              </div>
            </div>
            <div className="col-lg-8 align-self-center">
              <div className="services">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                      <div className="icon">
                        <img src="assets/images/service-icon-01.png" alt="Ikon Pemetaan" />
                      </div>
                      <div className="right-text">
                        <h4>Pemetaan Digital</h4>
                        <p>Visualisasi data sumber daya alam Kabupaten Bondowoso.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.7s">
                      <div className="icon">
                        <img src="assets/images/service-icon-02.png" alt="Ikon Integrasi Data" />
                      </div>
                      <div className="right-text">
                        <h4>Integrasi Data Instansi</h4>
                        <p>Menghubungkan data dari berbagai sektor secara terpusat.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="0.9s">
                      <div className="icon">
                        <img src="assets/images/service-icon-03.png" alt="Ikon Prediksi Panen" />
                      </div>
                      <div className="right-text">
                        <h4>Prediksi Panen</h4>
                        <p>Analisis prediksi panen untuk perencanaan strategis daerah.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="item wow fadeIn" data-wow-duration="1s" data-wow-delay="1.1s">
                      <div className="icon">
                        <img src="assets/images/service-icon-04.png" alt="Ikon Data Real-time" />
                      </div>
                      <div className="right-text">
                        <h4>Data Real-time</h4>
                        <p>Menggunakan basis data terbaru dari BPS dan sumber terpercaya.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="our-services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
              <div className="left-image">
                <img src="assets/images/services-left-image.png" alt="Layanan Geospasial" />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
              <div className="section-heading">
                <h2>Solusi <em>Geospasial</em> untuk Pemerintah Kabupaten <span>Bondowoso</span></h2>
                <p>Platform ini dirancang untuk membantu instansi pemerintah Kabupaten Bondowoso dalam pemantauan dan pengelolaan sumber daya alam berbasis teknologi geospasial yang akurat dan efisien.</p>
              </div>
              <div className="row">
                {commodityData.map((item, index) => (
                  <div className="col-lg-4 mb-4" key={index}>
                    <div
                      className="commodity-box p-4 rounded text-center h-100 d-flex flex-column justify-content-center"
                      style={{
                        backgroundColor: item.color,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default'
                      }}
                      // Event handler ini memerlukan 'use client'
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{item.nama}</h5>
                      <p style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>{item.jumlah}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="our-portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading wow bounceIn" data-wow-duration="1s" data-wow-delay="0.2s">
                <h2>Instansi <em>Terkait</em> dalam Sistem <span>Geospasial</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            {agencies.map((agency, index) => (
              <div className="col-lg-3 col-sm-6" key={index}>
                <a href="#">
                  <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay={`${0.3 + (index * 0.1)}s`}>
                    <div className="hidden-content">
                      <h4>{agency.name}</h4>
                      <p>{agency.desc}</p>
                    </div>
                    <div className="showed-content">
                      <img src={agency.logo} alt={`Logo ${agency.name}`} />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact-us section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center wow fadeInLeft" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <div className="section-heading">
                <h2>Hubungi Kami untuk Kolaborasi atau Informasi Lanjut</h2>
                <p>Apabila Anda berasal dari instansi pemerintah atau lembaga yang tertarik menggunakan atau mendukung sistem pemetaan geospasial ini, silakan hubungi kami.</p>
                <div className="phone-info">
                  <h4>Untuk pertanyaan lebih lanjut, hubungi:
                    <span><br /><i className="fa fa-phone"></i> 
                    <a href="tel:+6282233236128">+62 822-3323-6128</a></span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-duration="0.5s" data-wow-delay="0.25s">
              <form id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="text" name="name" id="name" placeholder="Nama Depan" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-6">
                    <fieldset>
                      <input type="text" name="surname" id="surname" placeholder="Nama Belakang" autoComplete="on" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Email" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" className="form-control" id="message" placeholder="Pesan Anda" required></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button">Kirim Pesan</button>
                    </fieldset>
                  </div>
                </div>
                <div className="contact-dec">
                  <img src="assets/images/contact-decoration.png" alt="Dekorasi Kontak" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.25s">
              <p>© 2025 Sistem Informasi Geospasial Bondowoso. All rights reserved.
                <br />Design by <a rel="nofollow" href="#">PANDAWA</a></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scripts - Sebaiknya di _document.js atau layout.js, tapi jika harus disini: */}
      {/* Catatan: Di Next.js, script eksternal sebaiknya menggunakan komponen <Script /> 
        atau diletakkan di layout.tsx root. 
        Tag <script> biasa mungkin tidak berjalan sempurna saat navigasi client-side.
      */}
    </>
  );
}