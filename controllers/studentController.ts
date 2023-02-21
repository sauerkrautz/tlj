import prisma from "../config/db";
import { Request, Response } from "express";

interface siswa {
  nama: string;
  nis: string;
  kelas: string;
  jekel: string;
  jurusan: string;
}

export const addStudent = async (req: Request, res: Response) => {
  const { nis, nama, jekel, kelas, jurusan }: siswa = req.body;

  try {
    await prisma.siswa.create({
      data: {
        nama,
        nis,
        jekel,
        kelas,
        jurusan,
      },
    });
    return res.status(200).json({ status: "success", code: "200" });
  } catch (error: any) {
    if (error.meta.target === "nis") {
      return res.status(400).json({ status: "nis sudah digunakan" });
    } else {
      return res.status(400).json({ error });
    }
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.siswa.findMany({
      select: {
        id_siswa: true,
        nama: true,
        nis: true,
        jekel: true,
        kelas: true,
        jurusan: true,
        peminjaman: {
          select: {
            id_peminjaman: true,
            id_buku: true,
            id_siswa: true,
            tgl_pinjam: true,
            buku: {
              select: {
                id_buku: true,
                kode_buku: true,
                nama_buku: true,
                penerbit: {
                  select: {
                    id_penerbit: true,
                    nama_penerbit: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nama, nis, jekel, kelas, jurusan }: siswa = req.body;

  const student = await prisma.siswa.findUnique({
    where: {
      id_siswa: id,
    },
  });

  try {
    await prisma.siswa.update({
      data: {
        nama: nama ? nama : student?.nama,
        nis: nis ? nis : student?.nis,
        jekel: jekel ? jekel : student?.jekel,
        kelas: kelas ? kelas : student?.kelas,
        jurusan: jurusan ? jurusan : student?.jurusan,
      },
      where: {
        id_siswa: id,
      },
    });

    return res.status(200).json({ status: "success", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.siswa.delete({
      where: {
        id_siswa: id,
      },
    });
    return res.status(200).json({ status: "deleted", code: "200" });
  } catch (error) {
    return res.status(200).json({ error });
  }
};
