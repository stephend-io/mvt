import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { title } from 'process'
import { fstat, write } from 'fs'
import { writeFile } from 'fs/promises'
import { MusicVideoType } from '@/zustand/store'

// Gets an array of MusicVideo objects with a default minRank of 1, and maxRank of 20
export async function GET(req: NextRequest) {
  const headerList = headers()
  console.log(headerList)

  let minYear: string | null | number = headerList.get('minYear')
  let monthYear: string | null = headerList.get('monthYear')
  console.log(`process.env.DATABASE_URL is: ${process.env.DATABASE_URL}`)

  console.log(minYear)
  console.log(monthYear)

  if (monthYear) {
    try {
      const songIds = monthIdGenerator(monthYear)
      console.log(songIds)
      console.log('this part reached')
      const data = (await prisma.song.findMany({
        select: {
          artist: true,
          title: true,
          links: true,
          rank: true,
          year: true,
        },
        where: {
          id: {
            in: songIds,
          },
        },
      })) as MusicVideoType[]
      console.log('this part reached')
      const filteredData = data.filter((song) => {
        return song.links.length >= 1
      })
      console.log('this part reached')

      console.log(data)
      console.log(filteredData)
      return NextResponse.json(filteredData)
    } catch (err) {
      console.log('this part reached')
      console.log(err)
      console.error('err')
    }
    return
  }

  if (minYear && minYear.length <= 2) {
    if (Number(minYear) > 10) {
      minYear = Number(minYear) + 1900
    } else {
      minYear = Number(minYear) + 2000
    }
    const res = await getHitsOfThe(minYear)
    console.log('\n\nTESTTEST\n\n')
    console.log(res)
    return NextResponse.json(res)
  } else if (minYear && minYear.length === 4) {
    minYear = Number(minYear)
  } else {
    throw 'Error fetching minYear with input: ' + minYear
  }

  console.log(`Input to route: ${headerList.get('minYear')} becomes ${minYear}`)

  const minRank = Number(headerList.get('minRank') ?? 1)
  const maxRank = Number(headerList.get('maxRank') ?? 40)
  const maxYear = headerList.get('maxYear') ? Number(headerList.get('maxYear')) : undefined

  console.log(minRank)
  console.log(maxRank)
  console.log(maxYear)

  console.log('getting videos...')

  let res: Promise<MusicVideoType[]>
  if (maxYear !== undefined) {
    res = getMusicVideosInRange({
      minYear,
      maxRank,
      minRank,
      maxYear,
    })
  } else {
    res = getMusicVideos({
      minYear,
      maxRank,
    })
  }

  return NextResponse.json(await res)
}

type MusicVideo = {
  artist: string
  title: string
  rank: number
  links: {
    id: string
    width: number
    height: number
  }[]
}

function monthIdGenerator(monthYearString: string) {
  let month: string
  let year: string
  if (monthYearString.length === 6) {
    month = monthYearString.slice(0, 2)
    year = monthYearString.slice(2, 6)
  } else {
    throw 'Invalid monthIdGenerator input'
  }

  const idArr: number[] = []
  for (let rank = 1; rank <= 100; rank++) {
    // idArr.push(Number(`${year}${}`))
    idArr.push(Number(year + month.padStart(2, '0') + String(rank).padStart(3, '0')))
  }
  return idArr
}

async function getMusicVideosInRange({ minRank, minYear, maxRank, maxYear }: { minYear: number; maxYear: number; minRank: number; maxRank: number }): Promise<MusicVideoType[]> {
  const songIds = yearIdsRangeGenerator(minYear, maxYear, minRank, maxRank)

  const data = (await prisma.song.findMany({
    select: {
      artist: true,
      title: true,
      links: true,
      year: true,
    },
    where: {
      id: {
        in: songIds,
      },
    },
  })) as MusicVideoType[]

  const titleSet = new Set<string>()
  const filteredData = data.filter((song) => {
    if (song.links.length <= 0) return false
    const titleExists = titleSet.has(song.title)
    if (titleExists) return false
    titleSet.add(song.title)
    return true
  })

  const arr = arrayRandomizer(filteredData)

  return arr
}

async function getMusicVideos({ minYear, maxRank }: { minYear: number; maxRank?: number }): Promise<MusicVideoType[]> {
  const songIds = yearIdsGenerator(minYear, maxRank)
  console.log(songIds)

  const data = (await prisma.song.findMany({
    select: {
      artist: true,
      title: true,
      links: true,
      rank: true,
      year: true,
    },
    where: {
      id: {
        in: songIds,
      },
    },
  })) as MusicVideoType[]

  const titleSet = new Set<string>()
  const filteredData = data.filter((song) => {
    if (song.links.length <= 0) return false
    const titleExists = titleSet.has(song.title)
    if (titleExists) return false
    titleSet.add(song.title)
    return true
  })

  const arr = arrayRandomizer(filteredData)

  console.log(arr)
  return arr
}

type optionalParams = {
  minYear?: number
  maxYear?: number
  minRank?: number
  maxRank?: number
}
function arrayRandomizer<T>(arr: T[]) {
  let tmp: T

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  return arr
}
function yearIdsRangeGenerator(minYear: number, maxYear: number, minRank: number, maxRank: number) {
  const songArray: number[] = []
  for (let year = minYear; year <= maxYear; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let rank = minRank; rank <= maxRank; rank++) {
        songArray.push(Number(year + String(month).padStart(2, '0') + String(rank).padStart(3, '0')))
      }
    }
  }
  console.log(songArray)
  return songArray
}

function yearIdsGenerator(minYear: number, maxRank: number = 20) {
  const songArray: number[] = []

  for (let month = 1; month <= 12; month++) {
    for (let rank = 1; rank <= maxRank; rank++) {
      songArray.push(Number(minYear + String(month).padStart(2, '0') + String(rank).padStart(3, '0')))
    }
  }

  return songArray
}

async function getHitsOfThe(decade: number): Promise<MusicVideoType[]> {
  console.log('getting hits of the... ')
  const songIds = yearIdsRangeGenerator(decade, decade + 9, 1, 20)
  console.log(songIds)

  // writeFile('songIds.json', JSON.stringify(songIds))
  const data = (await prisma.song.findMany({
    select: {
      artist: true,
      title: true,
      links: true,
      rank: true,
      year: true,
    },
    where: {
      id: {
        in: songIds,
      },
    },
  })) as MusicVideoType[]

  // writeFile('songData.json', JSON.stringify(data))

  console.log('getting hits of the... part 2')
  console.log(data)

  const titleSet = new Set<string>()
  const filteredData = data.filter((song) => {
    if (song.links.length <= 0) return false
    const titleExists = titleSet.has(song.title)
    if (titleExists) return false
    titleSet.add(song.title)
    return true
  })
  console.log(titleSet)
  console.log(filteredData)

  const arr = arrayRandomizer(filteredData)

  console.log(arr)
  return arr
}
