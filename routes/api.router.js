'use strict';

import express from'express';
import FilmsService from '../filmsService/films.service';

export default class ApiRouter {
  constructor() {
    this._filmsService = new FilmsService;
  }

  filmsApi() {
    const router = express.Router();

    router.route('/films')
      .get(this._filmsService.getFilms)
      .put(this._filmsService.addFilm);
    router.route('/films/:filmId')
      .get(this._filmsService.getFilm)
      .delete(this._filmsService.deleteFilm)
      .post(this._filmsService.editFilm);

    return router;
  }
}
