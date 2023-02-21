import prisma from "../config/db";
import { Request, Response } from "express";

interface pengembalian {
  tgl_pengembalian: string;
  id_buku: number;
  id_peminjaman: number;
  id_siswa: number;
}

export const addPengembalian = async (req: Request, res: Response) => {
  const { id_buku, id_peminjaman, id_siswa }: pengembalian = req.body;
  const now = new Date().toLocaleString();
  try {
    await prisma.pengembalian.create({
      data: {
        tgl_pengembalian: now,
        id_buku,
        id_peminjaman,
        id_siswa,
      },
    });
    return res.status(200).json({ status: "added", code: "200" });
  } catch (error: any) {
    return res.status(400).json({ error });
  }
};

export const getPengembalians = async (req: Request, res: Response) => {
  try {
    const pengembalians = await prisma.pengembalian.findMany({
      select: {
        id_pengembalian: true,
        tgl_pengembalian: true,
        id_buku: true,
        id_siswa: true,
        id_peminjaman: true,
        buku: {
          select: {
            nama_buku: true,
            pengarang: true,
            kode_buku: true,
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
        siswa: {
          select: {
            nis: true,
            nama: true,
            jekel: true,
            kelas: true,
            jurusan: true,
          },
        },
        peminjaman: {
          select: {
            tgl_pinjam: true,
          },
        },
      },
    });
    return res.status(200).json(pengembalians);
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const updatePengembalian = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { id_buku, id_peminjaman, id_siswa, tgl_pengembalian }: pengembalian =
    req.body;

  const pengembalian = await prisma.pengembalian.findUnique({
    where: {
      id_pengembalian: id,
    },
  });

  try {
    await prisma.pengembalian.update({
      data: {
        tgl_pengembalian: tgl_pengembalian
          ? tgl_pengembalian
          : pengembalian?.tgl_pengembalian,
        id_buku: id_buku ? id_buku : pengembalian?.id_buku,
        id_peminjaman: id_peminjaman
          ? id_peminjaman
          : pengembalian?.id_peminjaman,
        id_siswa: id_siswa ? id_siswa : pengembalian?.id_siswa,
      },
      where: {
        id_pengembalian: id,
      },
    });

    return res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const deletePengembalian = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.pengembalian.delete({
      where: {
        id_pengembalian: id,
      },
    });
    return res.status(200).json({ status: "deleted", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};
