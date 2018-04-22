'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class FilmModel {
  constructor() {
    let filmSchema = new Schema({
      name: {type: String, required: true},
      year: {type: Number, required:true},
      format: {
        type: String,
        required: true,
        enum: ['VHS', 'DVD', 'Blu-Ray']
      },
      actors: [{type: String}]
    }, {usePushEach: true});

    filmSchema.statics.findFilms = findFilms;
    filmSchema.statics.saveFilm = saveFilm;
    filmSchema.methods.updateFilm = updateFilm;

    async function findFilms(filterParams) {
      let filterObject = {};
      let sortBy = {'year': 'desc'};
      let skipRecords = 0;
      let limitRecords = 1;

      if (filterParams.name) {
        filterObject.name = filterParams.name;
      }
      if (filterParams.actor) {
        filterObject.actors = {$all: [filterParams.actor]};
      }
      if (filterParams.skip) {
        skipRecords = parseInt(filterParams.skip);
      }
      if (filterParams.limit) {
        limitRecords = parseInt(filterParams.limit);
      }
      if (filterParams['sort-by']) {
        sortBy = {[filterParams['sort-by']]: filterParams['sort-order']};
      }

      return await this
        .aggregate()
        .match(filterObject)
        .sort(sortBy)
        .skip(skipRecords)
        .limit(limitRecords)
        .exec();
    }

    function saveFilm(filmObject) {
      return new this(filmObject).save();
    }

    function updateFilm(filmObject) {
      this.name = filmObject.name;
      this.year = filmObject.year;
      this.format = filmObject.format;
      this.actors = filmObject.actors;

      return this.save();
    }

    delete mongoose.connection.models.Film;
    this._Film = mongoose.model('Film', filmSchema);
  }

  get Film() {
    return this._Film;
  }
}
