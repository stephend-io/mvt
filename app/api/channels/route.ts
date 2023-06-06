import { getPlaylistChannels } from "@/services/youtubeDataApi/PlaylistItems";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const channelIdArraySchema = z
  .array(z.string().length(24).startsWith("UC"))
  .max(50);
