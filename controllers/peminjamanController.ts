import prisma from "../config/db";
import { Request, Response } from "express";

interface peminjaman {
  tgl_pinjam: any;
  id_buku: any;
  id_siswa: any;
}

export const addPeminjaman = async (req: Request, res: Response) => {
  const { id_buku, id_siswa, tgl_pinjam }: peminjaman = req.body;
  console.table(req.body);

  const buku = await prisma.buku.findMany({ take: 1 });

  const siswa = await prisma.siswa.findMany({ take: 1 });

  const date = new Date();
  const now = date.toLocaleString();
  console.log(now);
  try {
    await prisma.peminjaman.create({
      data: {
        tgl_pinjam: tgl_pinjam,
        id_buku: id_buku ? id_buku : buku[0].id_buku,
        id_siswa: id_siswa ? id_siswa : siswa[0].id_siswa,
      },
    });
    return res.status(200).json({ status: "added", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const getPeminjamans = async (req: Request, res: Response) => {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      select: {
        id_peminjaman: true,
        id_buku: true,
        id_siswa: true,
        tgl_pinjam: true,
        siswa: {
          select: {
            nama: true,
            nis: true,
            jekel: true,
            kelas: true,
            jurusan: true,
          },
        },
        buku: {
          select: {
            id_buku: true,
            nama_buku: true,
            kode_buku: true,
            pengarang: true,
            kategori: true,
            penerbit: {
              select: {
                nama_penerbit: true,
                alamat: true,
                no_telp: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(peminjaman);
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const updatePeminjaman = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { id_buku, id_siswa, tgl_pinjam }: peminjaman = req.body;

  // const siswaId = parseInt(id_siswa);
  // const bukuId = parseInt(id_buku);

  const peminjaman = await prisma.peminjaman.findUnique({
    where: {
      id_peminjaman: id,
    },
  });

  console.log({ params: id, body: req.body });

  try {
    await prisma.peminjaman.update({
      data: {
        tgl_pinjam: tgl_pinjam ? tgl_pinjam : peminjaman?.tgl_pinjam,
        id_buku: id_buku ? id_buku : peminjaman?.id_buku,
        id_siswa: id_siswa ? id_siswa : peminjaman?.id_siswa,
      },
      where: {
        id_peminjaman: id,
      },
    });

    return res.status(200).json({ status: "updated", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const deletePeminjaman = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.peminjaman.delete({
      where: {
        id_peminjaman: id,
      },
    });
    return res.status(200).json({ status: "deleted", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};
