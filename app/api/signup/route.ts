import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  console.log("New subscriber:", email);

  // simulasi delay kirim email
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({
    success: true,
    message: "Free Catholic eBook sent to " + email,
  });
}