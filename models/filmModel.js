'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class FilmModel {
  constructor() {
    let filmSchema = new Schema({
      title: {type: String, required: true},
      year: {type: Number, required:true},
      format: {
        type: String,
        required: true,
        enum: ['VHS', 'DVD', 'Blu-Ray']
      },
      stars: [{type: String}]
    }, {usePushEach: true});

    filmSchema.statics.findFilms = findFilms;
    filmSchema.statics.saveFilm = saveFilm;
    filmSchema.methods.updateFilm = updateFilm;

    async function findFilms(filterParams) {
      let filterObject = {};
      let sortBy = {'year': 'desc'};
      let skipRecords = 0;
      let limitRecords = 1;

      if (filterParams.title) {
        filterObject.title = filterParams.title;
      }
      if (filterParams.stars) {
        filterObject.stars = {$all: [filterParams.stars]};
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
      this.title = filmObject.title;
      this.year = filmObject.year;
      this.format = filmObject.format;
      this.stars = filmObject.stars;

      return this.save();
    }

    delete mongoose.connection.models.Film;
    this._Film = mongoose.model('Film', filmSchema);
  }

  get Film() {
    return this._Film;
  }
}
