import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const DELETE = async (req: Request, res: Response) => {
  try {
    const personId = req.url.split("person/")[1];
    console.log(typeof personId);

    const person = await prisma.person.delete({
      where: {
        id: Number(personId),
      },
    });
    return NextResponse.json({ message: "OK", person }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const id = req.url.split("person/")[1];
  console.log(id);
  const { name, age, gender } = await req.json();
  try {
    const res = await prisma.person.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        age: age,
        gender: gender,
      },
    });
    return NextResponse.json({ message: "OK", res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
};
