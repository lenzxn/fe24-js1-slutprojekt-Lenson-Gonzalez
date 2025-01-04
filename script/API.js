import { displayErrorMessage } from "./display.js";

export const apiKey = "520dac76149fb206187c735503b3abef";
export const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
export let myGenres = [];

export async function retreiveGenres() {
  const response = await fetch(genreUrl);
  const data = await response.json();

  /* The genre-ids from the API-endpoint are saved in own array */
  myGenres = data.genres;
}

/** Receives the specific id for the current title, finds and
 matches with myGenre array of ids and returns the current genre */
export function getGenreById(ids, genreArray) {
  const genreNames = ids.map((id) => {
    const genre = genreArray.find((item) => item.id === id);

    return genre ? genre.name : "Unknown";
  });

  return genreNames.join(", ");
}

export async function topRatedMoviesRequest() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function topPopularMoviesRequest() {
  const moviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  const response = await fetch(moviesURL);
  const data = await response.json();
  return data;
}

export async function userSearchMovies(search) {
  /* The initial error approach was suggested by AI to help find API-specific responses 
  and I modified the code piece by piece to suit the specific requirements and improve functionality. */
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    search
  )}`;

  console.log(search);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("The requested resource was not found.");
      } else if (response.status === 500) {
        throw new Error("Server error! Please try again later.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } else {
      const data = await response.json();
      console.log(data.results);
      return data;
    }
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      displayErrorMessage(
        "Network error! Please check your connection and try again."
      );
    } else {
      displayErrorMessage(
        error.message || "An unexpected error occurred. Please try again later."
      );
    }
  }
}

export async function userSearchPeople(search) {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(
    search
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      let errorMessage;
      switch (response.status) {
        case 404:
          errorMessage = "The requested resource was not found.";
          break;
        case 500:
          errorMessage = "Server error! Please try again later.";
          break;
        default:
          errorMessage = `HTTP error! Status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      displayErrorMessage(
        "Network error! Please check your connection and try again."
      );
    } else {
      displayErrorMessage(
        error.message || "An unexpected error occurred. Please try again later."
      );
    }

    return null;
  }
}
