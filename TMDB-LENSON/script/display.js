import { getGenreById, myGenres } from "./API.js";

/* Fills out the specific Swiper-slides with content based on type */
export function displayTop10(data, type) {
  const top10 = data.results.slice(0, 10);
  console.log(top10);

  top10.forEach((movie, i) => {
    const img = document.getElementById(`${type}Img-${i}`);
    const poster = movie.poster_path;
    img.src = `https://image.tmdb.org/t/p/w300${poster}`;

    const backDrop = movie.backdrop_path;
    const background = document.getElementById(`${type}Slide-${i}`);

    background.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/w780${backDrop}')`;

    background.style.backgroundRepeat = "no-repeat";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";

    const title = movie.title;
    const titleH3 = document.getElementById(`${type}Title-${i}`);
    titleH3.innerText = title;

    const releaseDateP = document.getElementById(`${type}Year-${i}`);
    releaseDateP.innerText = "Release Date: " + movie.release_date;

    const summaryP = document.getElementById(`${type}Summary-${i}`);
    summaryP.innerText = movie.overview;

    const genreH4 = document.getElementById(`${type}Genre-${i}`);
    genreH4.innerText = getGenreById(movie.genre_ids, myGenres);
  });
}

/* Shows the search results by creating divs with classes and adding to empty results-container*/
export function displayMovieSearchResults(results) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  results.forEach((item) => {
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("search-result");

    let posterPath = item.poster_path
      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
      : "/images/c0749b7cc401421662ae901ec8f9f660.jpg";

    /* Took help by AI, sent directions and modified to needs */
    resultDiv.innerHTML = `
        <div class="movie-poster">
          <img src="${posterPath}" alt="${item.title}">
        </div>
        <div class="search-info">
          <h3 class="search-title">${item.title}</h3>
          <p class="search-release-date">Release Date: ${
            item.release_date || "N/A"
          }</p>
          <p class="search-description">${item.overview.substring(
            0,
            100
          )}...</p> 
        </div>
        <div class="search-popup">
          <p>${item.overview}</p> 
        </div>
      `;
    container.appendChild(resultDiv);
  });
}

export function displayPersonSearchResults(results) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  results.forEach((item) => {
    let resultDiv = document.createElement("div");
    resultDiv.className = "search-result";

    let profilePath = item.profile_path
      ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
      : "/images/c0749b7cc401421662ae901ec8f9f660.jpg";

    resultDiv.innerHTML = `
        <div class="movie-poster">
          <img src="${profilePath}" alt="${item.name}">
        </div>
        <div class="search-info">
          <h3 class="search-title">${item.name}</h3>
          <p class="search-description">Profession: ${
            item.known_for_department || "Unknown"
          }</p>
        </div>
        <div class="search-popup">
          <h4>Known for:</h4>
          <ul>
            ${item.known_for
              .map((known) => {
                if (known.media_type === "movie") {
                  return `<li><b>Movie:</b> ${known.title}</li>`;
                } else if (known.media_type === "tv") {
                  return `<li><b>TV:</b> ${known.name}</li>`;
                }
                return "";
              })
              .join("")}
          </ul>
        </div>
      `;
    container.appendChild(resultDiv);
  });
}

export function displayErrorMessage(message) {
  const container = document.getElementById("results-container");
  console.log("EROOOOOOORRRR");
  container.innerHTML = `
    <div class="no-results">
      <h5>${message}</h5>
      <img src="/images/oops.png" alt="No movies found" class="no-results-image">
    </div>
  `;
}
