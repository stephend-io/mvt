import fs from "fs";
import { randomUUID } from "crypto";

export function youtubeStringParser(youtubeString: string) {
  return {
    // ytStringTo
  };
}

export const simpleWriteFS = <T>(data: T, name: string = randomUUID()) => {
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
  };
}

export function getTimeFromTimeString(timeString: string) {
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

export function convertISO8601ToMilliseconds(interval: string) {
  const match = interval.match(
    /^P(?:(\d+Y)?(\d+M)?(\d+D)?)?(?:T(?:(\d+H)?(\d+M)?(\d+S)?)?)?$/
  );

  if (!match) {
    throw new Error("Invalid ISO 8601 interval format.");
  }

  const [, years, months, days, hours, minutes, seconds] = match;

  let milliseconds = 0;

  if (years) {
    milliseconds += parseInt(years, 10) * 31536000000; // 1 year = 31536000000 milliseconds
  }

  if (months) {
    milliseconds += parseInt(months, 10) * 2592000000; // 1 month = 2592000000 milliseconds (approx.)
  }

  if (days) {
    milliseconds += parseInt(days, 10) * 86400000; // 1 day = 86400000 milliseconds
  }

  if (hours) {
    milliseconds += parseInt(hours, 10) * 3600000; // 1 hour = 3600000 milliseconds
  }

  if (minutes) {
    milliseconds += parseInt(minutes, 10) * 60000; // 1 minute = 60000 milliseconds
  }

  if (seconds) {
    milliseconds += parseInt(seconds, 10) * 1000; // 1 second = 1000 milliseconds
  }

  return milliseconds;
}
