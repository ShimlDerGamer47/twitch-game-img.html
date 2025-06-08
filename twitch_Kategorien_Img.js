document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const twitchCategoriesImg = document.getElementById("twitchCategoriesImgId");
  if (!twitchCategoriesImg) return;

  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("gameId");
  const gameName = params.get("gameName");
  const width = params.get("width") || "1080";
  const height = params.get("height") || "1920";

  const fallbackImgSrc = "https://via.placeholder.com/" + width + "x" + height;

  let imgSrcURL;
  if (gameId) {
    imgSrcURL = `https://static-cdn.jtvnw.net/ttv-boxart/${gameId}-${width}x${height}.jpg`;
  } else if (gameName) {
    imgSrcURL = `https://static-cdn.jtvnw.net/ttv-boxart/${encodeURIComponent(
      gameName
    )}-${width}x${height}.jpg`;
  } else {
    imgSrcURL = fallbackImgSrc;
    console.warn(
      "Keine Game-ID oder Game-Name gefunden! Fallback-Bild wird verwendet."
    );
  }

  twitchCategoriesImg.src = imgSrcURL;
});
