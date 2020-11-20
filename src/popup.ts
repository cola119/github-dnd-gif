import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });
const fileInput = document.getElementById("file_input") as HTMLInputElement;

fileInput.onchange = async (event) => {
  console.log("onchange");
  if (!fileInput.files || fileInput.files.length === 0) return;
  const file = fileInput.files[0];
  const fileName = file.name;

  await ffmpeg.load();
  ffmpeg.FS("writeFile", fileName, await fetchFile(file));

  await ffmpeg.run("-i", fileName, "-r", "24", "output.gif");
  const data = ffmpeg.FS("readFile", "output.gif") as Uint8Array;

  console.log(data);
  const base64 = URL.createObjectURL(new Blob([data.buffer]));
  console.log(base64);
  const preview = document.getElementById("preview") as HTMLImageElement;
  preview.src = base64;

  chrome.runtime.sendMessage({ file }, (response: any) => {
    console.log("got response", response);
  });
};
