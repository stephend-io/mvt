import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const headerList = headers()
  const data = (await req.json()) as { title: string; artist: string }

  if (!data.title || !data.artist) {
    throw 'Invalid PUT call: Invalid title and/or artist'
  }
  console.log('creating')
  try {
    console.log(data.title)
    console.log(data.artist)
    const res = prisma.reportedSong
      .create({
        data: {
          title: data.title,
          artist: data.artist,
        },
      })
      // .then((e: undefined) => console.log(e))
      .catch((err: undefined) => console.log(err))
    console.log(res)
  } catch (err) {
    console.error(err)
  }
  console.log('successfully created')
  return NextResponse.json({ status: 200 })
}
