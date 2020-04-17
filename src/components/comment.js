import {castTimeFormat} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;
  return (
    `<li class="film-details__comment">
       <span class="film-details__comment-emoji">
         <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
       </span>
       <div>
         <p class="film-details__comment-text">${text}</p>
         <p class="film-details__comment-info">
           <span class="film-details__comment-author">${author}</span>
           <span class="film-details__comment-day">${formatCommentDate(date)}</span>
           <button class="film-details__comment-delete">Delete</button>
         </p>
       </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }
  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}

