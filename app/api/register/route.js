
import prisma from '../../../libs/prismadb'
import bcrypt from 'bcrypt'


import { NextResponse } from 'next/server'

export const POST = async (request) => {
  const body = await request.json()


  const { name, email, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)


  const user = await prisma.user.create({
    data: { name, email, hashedPassword }
  })

  return NextResponse.json(user)
}


