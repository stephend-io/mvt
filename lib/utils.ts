import fs from "fs";
import { randomUUID } from "crypto";

function getTimeFromTimeString(timeString: string) {
  // Extract hour, minute, and second values
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const hourIndex = timeString.indexOf("H");
  if (hourIndex !== -1) {
    hours = parseInt(timeString.slice(2, hourIndex));
  }

  const minuteIndex = timeString.indexOf("M");
  if (minuteIndex !== -1) {
    if (hourIndex !== -1) {
      minutes = parseInt(timeString.slice(hourIndex + 1, minuteIndex));
    } else {
      minutes = parseInt(timeString.slice(2, minuteIndex));
    }
  }

  const secondIndex = timeString.indexOf("S");
  if (secondIndex !== -1) {
    if (minuteIndex !== -1) {
      seconds = parseInt(timeString.slice(minuteIndex + 1, secondIndex));
    } else if (hourIndex === -1) {
      seconds = parseInt(timeString.slice(2, secondIndex));
    }
  }

  // Convert total time to seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
}

const simpleWriteFS = <T>(data: T, name: string = randomUUID()) => {
  fs.writeFileSync(__dirname + "/" + name + ".json", JSON.stringify(data));
};

export function validator() {
  return {
    channelID: (channelIDs: string[] | string) => {
      if (typeof channelIDs === "string") {
        if (channelIDs.length !== 24)
          throw "Invalid channelID length: " + channelIDs;
      } else {
        channelIDs.map((id) => {
          if (id.length !== 24) throw "Invalid channelID length: " + id;
        });
      }
    },
    // videoID: (videoIDs: string[] | string) => {
    //   if (typeof videoIDs === "string") {
    //     if (videoIDs.length !== 24) throw "Invalid videoID length: " + videoIDs;
    //   } else {
    //     videoIDs.map((id) => {
    //       if (id.length !== 24) throw "Invalid videoID length: " + id;
    //     });
    //   }
    // },
  };
}
