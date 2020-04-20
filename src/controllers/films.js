import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import FilmController from "./film.js";

export default class FilmsController {
  constructor(container, {DEFAULT_SHOW, SHOW_MORE, TOP_RATED, MOST_COMMENTED}) {
    this._container = container;
    this._defaultShowCount = DEFAULT_SHOW;
    this._showMoreCount = SHOW_MORE;
    this._topRatedCount = TOP_RATED;
    this._mostCommentedCount = MOST_COMMENTED;
    this._filmsComponent = new FilmsComponent();
    this._filmsElement = this._filmsComponent.getElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  _getMostCommentedFilms(films) {
    return films.slice().sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    })
    .slice(0, this._mostCommentedCount);
  }

  _getTopRatedFilms(films) {
    return films.slice().sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    })
  .slice(0, this._topRatedCount);
  }

  getWatchStats(films) {
    const reduceFilms = (stats, film) => {
      if (film.isAddedToWatchlist) {
        stats.watchlist += 1;
      }
      if (film.isMarkedAsWatched) {
        stats.history += 1;
      }
      if (film.isFavorite) {
        stats.favorites += 1;
      }
      return stats;
    };
    return films.reduce(reduceFilms, {
      watchlist: 0,
      history: 0,
      favorites: 0
    });
  }

  render(films) {

    if (films.length === 0) {
      render(this._filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    const filmsListElement = this._filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    let showingCardsCount = this._defaultShowCount;

    films.slice(0, showingCardsCount).forEach((film)=>
      new FilmController(filmsListContainerElement).render(film));

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = showingCardsCount;

      showingCardsCount = showingCardsCount + this._showMoreCount;

      films.slice(prevCardsCount, showingCardsCount).forEach((film) =>
        new FilmController(filmsListContainerElement).render(film));

      if (showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(filmsListElement, this._showMoreButtonComponent);

    const mostCommentedFilms = this._getMostCommentedFilms(films);
    const topRatedFilms = this._getTopRatedFilms(films);

    render(this._filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    render(this._filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

    const topRatedFilmsElement = this._filmsElement.querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedFilmsElement = this._filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

    topRatedFilms.forEach((film) => new FilmController(topRatedFilmsElement).render(film));
    mostCommentedFilms.forEach((film) => new FilmController(mostCommentedFilmsElement).render(film));

    render(this._container, this._filmsComponent);
  }
}
