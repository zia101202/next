import { NextResponse,NextRequest } from "next/server";

export const POST = async(req:NextRequest) => {
 const userId=  await req.json()
 console.log(userId);

 let user=`This is  user ID:${userId.id}`
  return NextResponse.json({
  user: user,
    status: 201,
  });
};

 