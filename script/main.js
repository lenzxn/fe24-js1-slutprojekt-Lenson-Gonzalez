import {
  retreiveGenres,
  topPopularMoviesRequest,
  topRatedMoviesRequest,
  userSearchMovies,
  userSearchPeople,
} from "./API.js";

import {
  displayTop10,
  displayMovieSearchResults,
  displayPersonSearchResults,
  displayErrorMessage,
} from "./display.js";

renderTopTenLists();
/**Initializes the Top-Ten content */
async function renderTopTenLists() {
  await retreiveGenres();

  topRatedMoviesRequest().then((data) => displayTop10(data, "topRated"));
  topPopularMoviesRequest().then((data) => displayTop10(data, "topPopular"));
}

document
  .getElementById("movie-search-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const search = document.getElementById("movie-search-input").value;
    const data = await userSearchMovies(search);

    if (data.results.length === 0) {
      displayErrorMessage("No movies found. Try searching for something else.");
    } else {
      displayMovieSearchResults(data.results);
    }
  });

document
  .getElementById("person-search-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const search = document.getElementById("person-search-input").value;
    const data = await userSearchPeople(search);
    if (data.results.length === 0) {
      displayErrorMessage("No people found. Try searching for something else.");
    } else {
      displayPersonSearchResults(data.results);
    }
  });

/* Make the header logo dissapear and add more space for the search-forms*/
document.getElementById("searchIcon").addEventListener("click", () => {
  document.querySelector(".headerLogo").classList.add("hide");
  document.querySelector(".headerLogo").classList.remove("show");
  document.getElementById("searchDiv").classList.add("show");
  document.getElementById("searchDiv").classList.remove("hide");
  document.querySelector(".searchIcon").classList.add("hide");
  document.querySelector(".searchIcon").classList.remove("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional: makes the scroll smooth
  });
});

/* Make the search-forms dissapear when out of focus for a dynamic function, 
this function however has a small issue when the browser gives any type of 
"input suggestions" upon clicking on any of the two input forms, if the mouse 
is moved anywhere inside the "suggestion bar" - the bowser inpertrepts that as leaving 
thus triggering below function and evenlistener unitentionally */
function handleHeaderMouseLeave() {
  document.querySelector(".headerLogo").classList.add("show");
  document.querySelector(".headerLogo").classList.remove("hide");
  document.getElementById("searchDiv").classList.add("hide");
  document.getElementById("searchDiv").classList.remove("show");
  document.querySelector(".searchIcon").classList.add("show");
  document.querySelector(".searchIcon").classList.remove("hide");
}

const header = document.getElementById("header");
header.addEventListener("mouseleave", handleHeaderMouseLeave);

/* To combat the issue mentioned in previous comment
 I have added following evenlisteners to both forms */
document.getElementById("movie-search-input").addEventListener("focus", () => {
  header.removeEventListener("mouseleave", handleHeaderMouseLeave);
});

document.getElementById("person-search-input").addEventListener("focus", () => {
  header.removeEventListener("mouseleave", handleHeaderMouseLeave);
});

document.getElementById("movie-search-input").addEventListener("blur", () => {
  header.addEventListener("mouseleave", handleHeaderMouseLeave);
});

document.getElementById("person-search-input").addEventListener("blur", () => {
  header.addEventListener("mouseleave", handleHeaderMouseLeave);
});

/* reference: https://swiperjs.com/swiper-api?utm_source=chatgpt.com#styles
 "Initialize Swiper" - "carousel slides" */
const swiper1 = new Swiper(".swiperContainer-1", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiperPage-1",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiperNext-1",
    prevEl: ".swiperPrev-1",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const swiper2 = new Swiper(".swiperContainer-2", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiperPage-2",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiperNext-2",
    prevEl: ".swiperPrev-2",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});
