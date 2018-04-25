'use strict';

import lo4js from 'log4js';
import FilmModel from '../models/filmModel';
import validator from 'node-validator';
import {NotFoundError, ValidationError} from '../lib/ErrorHandler';

export default class FilmsService {
  constructor(){
    this._logger = lo4js.getLogger('app');
    this._logger.level = 'debug';

    this._filmModel = new FilmModel();
  }

  get addFilm() {
    return this._addFilm.bind(this);
  }

  get deleteFilm() {
    return this._deleteFilm.bind(this);
  }

  get getFilm() {
    return this._getFilm.bind(this);
  }

  get getFilms() {
    return this._getFilms.bind(this);
  }

  get editFilm() {
    return this._editFilm.bind(this);
  }

  async _addFilm(req, res, next) {
    try {
      const filmObject = this._validateFilm(req, next);
      const film = await this._filmModel.Film.saveFilm(filmObject);
      delete film.__v;

      res.status(200).json(film);
    } catch (err) {
      next(err);
    }
  }

  async _deleteFilm(req, res, next) {
    try {
      const filmId = req.params.filmId;
      const film = await this._checkIfFilmExists(filmId);
      await film.remove();

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async _getFilm(req, res, next) {
    try {
      const filmId = req.params.filmId;
      const film = await this._checkIfFilmExists(filmId);
      delete film.__v;

      res.status(200).json(film);
    } catch (err) {
      next(err);
    }
  }

  async _getFilms(req, res, next) {
    try {
      this._validateFilterParams(req);
      const films = await this._filmModel.Film.findFilms(req.query);

      res.status(200).json(films);
    } catch (err) {
      next(err);
    }
  }

  async _editFilm(req, res, next) {
    try {
      const filmId = req.params.filmId;
      const film = await this._checkIfFilmExists(filmId);
      const filmObject = this._validateFilm(req, next);

      const modifiedFilm = await film.updateFilm(filmObject);

      res.status(200).json(modifiedFilm);
    } catch (err) {
      next(err);
    }
  }

  _validateFilterParams(req) {
    function validateSortParam(value, onError) {
      if (value['sort-by'] && !value['sort-order'] || !value['sort-by'] && value['sort-order']) {
        onError('both sort-by and sort-order must be defined', 'sort-by|sort-order', null);
      }
      if (value['sort-by']) {
        const sortableByFields = ['title', 'stars'];
        if (sortableByFields.indexOf(value['sort-by']) === -1) {
          onError('sort must be either of \'title\', \'stars\'', 'sort-by', null);
        }

        const sortOrder = ['asc', 'desc'];
        if (sortOrder.indexOf(value['sort-order']) === -1) {
          onError('sort-order must be either of \'asc\' or \'desc\'', 'sort-order', null);
        }
      }
    }

    const filterRules = validator.isObject()
      .withOptional('title', validator.isString())
      .withOptional('stars', validator.isString())
      .withOptional('offset', validator.isInteger({allowString: true, min: 0}))
      .withOptional('limit', validator.isInteger({allowString: true, min: 1}))
      .withCustom(validateSortParam)
      .withOptional('sort-by', validator.isString())
      .withOptional('sort-order', validator.isString());

    validator.run(filterRules, req.query, (errorCount, err) => {
      if (errorCount !== 0) {
        throw new ValidationError(err);
      }
    });
  }

  _validateFilm(req, next) {
    function validateFormat(value, onError) {
      if (value.format !== 'VHS' && value.format !== 'DVD' && value.format !== 'Blu-Ray') {
        onError('Format must be either of \'VHS\', \'DVD\' or \'Blu-Ray\'', 'format', null);
      }
    }
    const filmObject = req.body;

    const userRules = validator.isObject()
      .withRequired('title', validator.isString())
      .withRequired('year', validator.isInteger({allowString: true, min: 1930}))
      .withCustom(validateFormat)
      .withRequired('format', validator.isString())
      .withRequired('stars', validator.isArray(validator.isString()));

    validator.run(userRules, filmObject, (errorCount, err) => {
      if (errorCount !== 0) {
        throw new ValidationError(err);
      }
    });

    return filmObject;
  }

  async _checkIfFilmExists(filmId) {
    const film = await this._filmModel.Film.findById(filmId);

    if(!film)  {
      throw new NotFoundError(`Film with specified id of ${filmId} not found`);
    }

    return film;
  }
}