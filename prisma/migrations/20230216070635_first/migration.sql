-- CreateTable
CREATE TABLE `buku` (
    `id_buku` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_buku` VARCHAR(255) NOT NULL,
    `nama_buku` VARCHAR(255) NOT NULL,
    `kategori` VARCHAR(255) NOT NULL,
    `pengarang` VARCHAR(255) NOT NULL,
    `id_penerbit` INTEGER NOT NULL,

    UNIQUE INDEX `kode_buku`(`kode_buku`),
    INDEX `buku_penerbit`(`id_penerbit`),
    PRIMARY KEY (`id_buku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_pinjam` DATE NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `id_siswa` INTEGER NOT NULL,

    INDEX `ib_buku_peminjaman`(`id_buku`),
    INDEX `id_siswa_peminjaman`(`id_siswa`),
    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penerbit` (
    `id_penerbit` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_penerbit` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `no_telp` INTEGER NOT NULL,
    `kota` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_penerbit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengembalian` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_pengembalian` DATE NOT NULL,
    `id_siswa` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `id_peminjaman` INTEGER NOT NULL,

    INDEX `id_buku_pengembalian`(`id_buku`),
    INDEX `id_siswa_pengembalian`(`id_siswa`),
    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id_siswa` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` INTEGER NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `kelas` VARCHAR(255) NOT NULL,
    `jekel` VARCHAR(1) NOT NULL,
    `jurusan` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `nis`(`nis`),
    PRIMARY KEY (`id_siswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `buku` ADD CONSTRAINT `buku_penerbit` FOREIGN KEY (`id_penerbit`) REFERENCES `penerbit`(`id_penerbit`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `ib_buku_peminjaman` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `id_siswa_peminjaman` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id_siswa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `id_buku_pengembalian` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `id_peminjaman_pengembalian` FOREIGN KEY (`id_pengembalian`) REFERENCES `peminjaman`(`id_peminjaman`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pengembalian` ADD CONSTRAINT `id_siswa_pengembalian` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id_siswa`) ON DELETE NO ACTION ON UPDATE NO ACTION;
