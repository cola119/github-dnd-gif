// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const file = message.file as File;
  console.log(file);
  console.log(file.name);
});
