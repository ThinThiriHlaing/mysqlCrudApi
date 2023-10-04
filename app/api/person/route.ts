// import { addPerson, person } from "@/lib/data";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export const GET = async (req: Request, res: Response) => {
  try {
    const person = await prisma.person.findMany();

    return NextResponse.json({ message: "OK", person }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "NO PERSON DATA FOUND" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: Response) => {
  const { name, age, gender } = await req.json();
  const post = { name, age, gender };
  try {
    await prisma.person.createMany({
      data: post,
      skipDuplicates: true,
    });
    console.log(post);
    return NextResponse.json({ message: "OK", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
};
