document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const fontFamily = "--font-family";
  const robotoBolt = getComputedStyle(html).getPropertyValue(fontFamily);
  const body = document.body;

  body.style.fontFamily = robotoBolt;

  const container = document.getElementById("twitchCategoriesImgContainerId");
  if (!container) return;

  container.style.fontFamily = robotoBolt;

  const twitchImg = document.getElementById("twitchCategoriesImgId");
  if (!twitchImg) return;

  twitchImg.style.fontFamily = robotoBolt;

  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("gameId");
  const gameName = params.get("gameName");

  function makeSrc(w, h) {
    if (gameId) {
      return `https://static-cdn.jtvnw.net/ttv-boxart/${gameId}-${w}x${h}.jpg`;
    } else if (gameName) {
      return `https://static-cdn.jtvnw.net/ttv-boxart/${encodeURIComponent(
        gameName
      )}-${w}x${h}.jpg`;
    } else {
      console.warn("Keine Game-ID/-Name – nutze Platzhalter");
      return `https://via.placeholder.com/${w}x${h}`;
    }
  }

  function debounce(fn, delay = 100) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

  function updateImagePortrait() {
    const dpr = window.devicePixelRatio || 1;
    const container = document.getElementById("twitchCategoriesImgContainerId");
    const containerH = container.clientHeight * dpr;
    const w = Math.floor((containerH * 9) / 16);
    const h = Math.floor(containerH);

    twitchImg.src = makeSrc(w, h);
  }

  updateImagePortrait();
  window.addEventListener("resize", debounce(updateImagePortrait));
});
