import prisma from "../config/db";
import { Request, Response } from "express";

interface book {
  kode_buku: string;
  nama_buku: string;
  pengarang: string;
  id_penerbit: string;
  kategori: string;
}

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.buku.findMany({
      select: {
        _count: true,
        id_buku: true,
        nama_buku: true,
        kode_buku: true,
        pengarang: true,
        kategori: true,
        penerbit: {
          select: {
            id_penerbit: true,
            nama_penerbit: true,
            alamat: true,
            no_telp: true,
          },
        },
      },
    });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { kode_buku, nama_buku, pengarang, kategori, id_penerbit }: book =
    req.body;
  const id = parseInt(id_penerbit);
  console.log(req.body);

  const publishers = await prisma.penerbit.findMany();

  try {
    await prisma.buku.create({
      data: {
        nama_buku,
        kode_buku,
        pengarang,
        kategori,
        id_penerbit: id ? id : publishers[0].id_penerbit,
      },
    });
    return res.status(200).json({ status: "success", code: "200" });
  } catch (error: any) {
    if (error?.meta?.target === "kode_buku") {
      return res.status(400).json({ msg: "kode buku sudah digunakan" });
    } else {
      return res.status(400).json({ error });
    }
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const book = await prisma.buku.findUnique({
      where: {
        id_buku: id,
      },
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.buku.delete({
      where: {
        id_buku: id,
      },
    });
    return res.status(200).json({ status: "deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  console.log({ params: id, body: req.body });
  const { kategori, kode_buku, nama_buku, pengarang, id_penerbit }: book =
    req.body;
  const penerbit = parseInt(id_penerbit);

  const book = await prisma.buku.findUnique({
    where: {
      id_buku: id,
    },
  });

  try {
    await prisma.buku.update({
      data: {
        nama_buku: nama_buku ? nama_buku : book?.nama_buku,
        kode_buku: kode_buku ? kode_buku : book?.kode_buku,
        pengarang: pengarang ? pengarang : book?.pengarang,
        kategori: kategori ? kategori : book?.kategori,
        id_penerbit: penerbit ? penerbit : book?.id_penerbit,
      },
      where: {
        id_buku: id,
      },
    });
    return res.status(200).json({ status: "updated" });
  } catch (error) {
    console.table(req.body);
    return res.status(400).json({ error });
  }
};
