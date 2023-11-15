import { NextRequest, NextResponse } from "next/server";
import db from '@/libs/db';

export async function POST(request: NextRequest){
  const data = await request.json();

  
  const userFound = await db.user.findUnique({
    where:{
      email: data.email
    }
  });
  if(userFound){
    return NextResponse.json({
      message: 'Email already exists'
    }, {
      status: 400
  });
  }
  console.log(data);
  const newUser = await db.user.create({
    data});
  return NextResponse.json(newUser);
}