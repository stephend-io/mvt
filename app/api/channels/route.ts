import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// Gets an array of MusicVideo objects with a default minRank of 1, and maxRank of 20
export async function GET(req: NextRequest) {
  const headerList = headers();

  let minYear: string | number = headerList.get("minYear");

  if (!minYear || minYear.length !== 4) {
    throw "Error fetching minYear";
  }
  minYear = Number(minYear);

  const minRank = Number(headerList.get("minRank") ?? 1);
  const maxRank = Number(headerList.get("maxRank") ?? 20);
  const maxYear = headerList.get("maxYear")
    ? Number(headerList.get("maxYear"))
    : undefined;

  console.log(minRank);
  console.log(maxRank);
  console.log(maxYear);

  console.log("getting videos...");

  let res: Promise<MusicVideo[]>;
  if (maxYear !== undefined) {
    res = getMusicVideosInRange({
      minYear,
      maxRank,
      minRank,
      maxYear,
    });
  } else {
    res = getMusicVideos({
      minYear,
      maxRank,
    });
  }

  return NextResponse.json(await res);
}

type MusicVideo = {
  artist: string;
  title: string;
  links: {
    id: string;
    width: number;
    height: number;
  }[];
};

export async function getMusicVideosInRange({
  minRank,
  minYear,
  maxRank,
  maxYear,
}: {
  minYear: number;
  maxYear: number;
  minRank: number;
  maxRank: number;
}): Promise<MusicVideo[]> {
  const songIds = yearIdsRangeGenerator(minYear, minRank, maxRank, maxYear);

  const data = (await prisma.song.findMany({
    select: {
      artist: true,
      title: true,
      links: true,
    },
    where: {
      id: {
        in: songIds,
      },
    },
  })) as MusicVideo[];

  const titleSet = new Set<string>();
  const filteredData = data.filter((song) => {
    const titleExists = titleSet.has(song.title);
    if (titleExists) return false;
    titleSet.add(song.title);
    return true;
  });

  const arr = arrayRandomizer(filteredData);

  return arr;
}

export async function getMusicVideos({
  minYear,
  maxRank,
}: {
  minYear: number;
  maxRank?: number;
}): Promise<MusicVideo[]> {
  const songIds = yearIdsGenerator(minYear, maxRank);
  console.log(songIds);

  const data = (await prisma.song.findMany({
    select: {
      artist: true,
      title: true,
      links: true,
    },
    where: {
      id: {
        in: songIds,
      },
    },
  })) as MusicVideo[];

  const titleSet = new Set<string>();
  const filteredData = data.filter((song) => {
    const titleExists = titleSet.has(song.title);
    if (titleExists) return false;
    titleSet.add(song.title);
    return true;
  });

  const arr = arrayRandomizer(filteredData);

  console.log(arr);
  return arr;
}

type optionalParams = {
  minYear?: number;
  maxYear?: number;
  minRank?: number;
  maxRank?: number;
};
export function arrayRandomizer<T>(arr: T[]) {
  let tmp: T;

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  return arr;
}
export function yearIdsRangeGenerator(
  minYear: number,
  minRank: number,
  maxRank: number,
  maxYear: number
) {
  const songArray: number[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let rank = minRank; rank <= maxRank; rank++) {
        songArray.push(
          Number(
            minYear +
              String(month).padStart(2, "0") +
              String(rank).padStart(3, "0")
          )
        );
      }
    }
  }
  return songArray;
}

export function yearIdsGenerator(minYear: number, maxRank: number = 20) {
  const songArray: number[] = [];

  for (let month = 1; month <= 12; month++) {
    for (let rank = 1; rank <= maxRank; rank++) {
      songArray.push(
        Number(
          minYear +
            String(month).padStart(2, "0") +
            String(rank).padStart(3, "0")
        )
      );
    }
  }

  return songArray;
}
