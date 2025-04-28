import { NextResponse } from "next/server";

export const GET = () => {
  let array = [
    { user: "ali", id: 123 },
    { user: "ali", id: 123 },
    { user: "ali", id: 123 },
    { user: "ali", id: 123 },
    { user: "ali", id: 123 },
    { user: "ali", id: 123 },
  ];

  return NextResponse.json({
    data: array,
    status: 201,
  });
};

 


