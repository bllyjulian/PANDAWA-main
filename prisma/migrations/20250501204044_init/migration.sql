-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail" (
    "tax_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "post_kode" TEXT NOT NULL,
    "photo_profile" TEXT NOT NULL,

    CONSTRAINT "detail_pkey" PRIMARY KEY ("tax_id")
);

-- CreateTable
CREATE TABLE "data_kecamatan" (
    "id_kecamatan" SERIAL NOT NULL,
    "id_komoditas" INTEGER NOT NULL,
    "nama_kecamatan" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "posisi_x" DOUBLE PRECISION NOT NULL,
    "posisi_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "data_kecamatan_pkey" PRIMARY KEY ("id_kecamatan")
);

-- CreateTable
CREATE TABLE "data_penduduk" (
    "id_penduduk" SERIAL NOT NULL,
    "id_kecamatan" INTEGER NOT NULL,
    "data_tahun" INTEGER NOT NULL,
    "jumlah_penduduk" DOUBLE PRECISION NOT NULL,
    "laju_pertumbuhan" VARCHAR(30) NOT NULL,

    CONSTRAINT "data_penduduk_pkey" PRIMARY KEY ("id_penduduk")
);

-- CreateTable
CREATE TABLE "data_komoditas" (
    "id_komoditas" SERIAL NOT NULL,
    "nama_komoditas" VARCHAR(100) NOT NULL,
    "posisi_x" DOUBLE PRECISION NOT NULL,
    "posisi_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "data_komoditas_pkey" PRIMARY KEY ("id_komoditas")
);

-- CreateTable
CREATE TABLE "hasil_panen" (
    "id_panen" SERIAL NOT NULL,
    "id_kecamatan" INTEGER NOT NULL,
    "id_komoditas" INTEGER NOT NULL,
    "tahun_panen" INTEGER NOT NULL,
    "produksi" DOUBLE PRECISION NOT NULL,
    "luas_panen" DOUBLE PRECISION NOT NULL,
    "produktivitas" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "hasil_panen_pkey" PRIMARY KEY ("id_panen")
);

-- CreateTable
CREATE TABLE "prediksi_panen" (
    "id_prediksi" SERIAL NOT NULL,
    "id_kecamatan" INTEGER NOT NULL,
    "id_komoditas" INTEGER NOT NULL,
    "tahun_prediksi" INTEGER NOT NULL,
    "hasil_prediksi" INTEGER NOT NULL,

    CONSTRAINT "prediksi_panen_pkey" PRIMARY KEY ("id_prediksi")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "detail" ADD CONSTRAINT "detail_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kecamatan" ADD CONSTRAINT "data_kecamatan_id_komoditas_fkey" FOREIGN KEY ("id_komoditas") REFERENCES "data_komoditas"("id_komoditas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_penduduk" ADD CONSTRAINT "data_penduduk_id_kecamatan_fkey" FOREIGN KEY ("id_kecamatan") REFERENCES "data_kecamatan"("id_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hasil_panen" ADD CONSTRAINT "hasil_panen_id_kecamatan_fkey" FOREIGN KEY ("id_kecamatan") REFERENCES "data_kecamatan"("id_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hasil_panen" ADD CONSTRAINT "hasil_panen_id_komoditas_fkey" FOREIGN KEY ("id_komoditas") REFERENCES "data_komoditas"("id_komoditas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediksi_panen" ADD CONSTRAINT "prediksi_panen_id_kecamatan_fkey" FOREIGN KEY ("id_kecamatan") REFERENCES "data_kecamatan"("id_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediksi_panen" ADD CONSTRAINT "prediksi_panen_id_komoditas_fkey" FOREIGN KEY ("id_komoditas") REFERENCES "data_komoditas"("id_komoditas") ON DELETE RESTRICT ON UPDATE CASCADE;
