import AbstractFilmsController from "./abstract-films-controller.js";
import {CardCount} from "../consts.js";
import {getSortedArrayByKey} from "../utils/common.js";

export default class TopRatedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, commentsModel) {
    super(container, modalContainer, filmsModel, commentsModel);
  }

  render() {
    super.render();
    this._renderFilms(this._getTopRatedFilms());
  }

  _getTopRatedFilms() {
    return getSortedArrayByKey(this._filmsModel.getFilmsAll(), `rating`).slice(0, CardCount.TOP_RATED);
  }
}
