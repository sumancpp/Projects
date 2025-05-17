const key = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const GenBtn = document.getElementById("btn");
const svg = document.getElementById("svg");
const load = document.getElementById("loading");
const ResetBtn = document.getElementById("reset");
const DownloadBtn = document.getElementById("download");

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ZB-tech/Text-to-Image",
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      method: "POST",
      body: JSON.stringify({ inputs: inputText.value }),
    }
  );
  const result = await response.blob();
  image.style.display = "block";
  load.style.display = "none";

  return result;
}

async function generate() {
  load.style.display = "block";
  query().then((response) => {
    const objectUrl = URL.createObjectURL(response);
    image.src = objectUrl;
    DownloadBtn.addEventListener("click", () => {
      download(objectUrl);
    });
  });
}

GenBtn.addEventListener("click", () => {
  generate();
  svg.style.display = "none";
});

inputText.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    generate();
    svg.style.display = "none";
  }
});

ResetBtn.addEventListener("click", () => {
  inputText.value = "";
  window.location.reload();
});

function download(objectUrl) {
  fetch(objectUrl)
    .then((res) => res.blob())
    .then((file) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed Download"));
}
