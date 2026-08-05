const input = document.querySelector("#movieSearchBar");
const form = document.querySelector("form");
const movieContainer = document.querySelector("#movieContainer");
const favoriteSection = document.querySelector("#favorites-section");
const movieList = [];

form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const userSearch = form.elements.query.value;
    const config = { params: { q: userSearch } };
    const result = await axios.get(
      `https://api.tvmaze.com/search/shows`,
      config,
    );

    makeImages(result.data);
    form.elements.query.value = "";
  } catch (e) {
    console.log(e);
  }
});

const makeImages = function Generator(shows) {
  for (let i = 0; i < shows.length; i++) {
    const showImg = shows[i].show.image;
    const showName = shows[i].show.name;
    if (showImg && showName) {
      const card = document.createElement("div"); // the wrapper
      card.className = "cell";

      const img = document.createElement("img");
      img.src = showImg.medium;
      img.className = "image is-4by5";

      const h2 = document.createElement("h2");
      h2.textContent = showName;

      const btn = document.createElement("button");
      btn.className = "button is-white";
      btn.innerText = "Add";

      btn.addEventListener("click", function (e) {
        if (!movieList.includes(shows[i])) {
          movieList.push(shows[i]);
        }
        movies2Watch(movieList);
      });

      card.append(img, h2, btn); // all three go INSIDE the card
      movieContainer.append(card); // the card goes in the grid
    }
  }
};
const movies2Watch = function movieSelector(movies) {
  favoriteSection.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const showImg = movies[i].show.image;
    const showName = movies[i].show.name;
    if (showImg && showName) {
      const card = document.createElement("div");
      card.className = "cell";

      const img = document.createElement("img");
      img.src = showImg.medium;

      const h2 = document.createElement("h2");
      h2.textContent = showName;

      const btnRMV = document.createElement("button");
      btnRMV.addEventListener("click", function (e) {
        movieList.splice(i, 1);
        movies2Watch(movieList);
      });
      btnRMV.className = "button is-white";
      btnRMV.innerText = "Remove";

      card.append(img, h2, btnRMV);
      favoriteSection.append(card);
    }
  }
};
