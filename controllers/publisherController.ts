import { Request, Response } from "express";
import prisma from "../config/db";

interface penerbitBody {
  nama_penerbit: string;
  alamat: string;
  kota: string;
  no_telp: string;
}

export const addPublisher = async (req: Request, res: Response) => {
  const { nama_penerbit, alamat, kota, no_telp }: penerbitBody = req.body;
  console.table(req.body);
  try {
    await prisma.penerbit.create({
      data: {
        nama_penerbit,
        alamat,
        kota,
        no_telp,
      },
    });
    res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getPublishers = async (req: Request, res: Response) => {
  try {
    const publishers = await prisma.penerbit.findMany();
    res.status(200).json(publishers);
  } catch (error) {
    console.table(error);
    res.status(400).json(error);
  }
};

export const udpatePublisher = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nama_penerbit, alamat, kota, no_telp }: penerbitBody = req.body;
  const publisher = await prisma.penerbit.findUnique({
    where: {
      id_penerbit: id,
    },
  });

  try {
    await prisma.penerbit.update({
      data: {
        nama_penerbit: nama_penerbit ? nama_penerbit : publisher?.nama_penerbit,
        alamat: alamat ? alamat : publisher?.alamat,
        kota: kota ? kota : publisher?.kota,
        no_telp: no_telp ? no_telp : publisher?.no_telp,
      },
      where: {
        id_penerbit: id,
      },
    });
    res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deletePublisher = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.penerbit.delete({
      where: {
        id_penerbit: id,
      },
    });
    res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deletePublishers = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await prisma.penerbit.deleteMany({
      where: {
        no_telp: id,
      },
    });
    res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
