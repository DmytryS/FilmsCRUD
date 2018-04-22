'use strict';

import service from './service';
import debug from 'debug';//('filmscrud:server');
import http from 'http';
import configuration from './config';
import mongoose from "mongoose";
import lo4js from 'log4js';

let config;

export default class App {
  constructor(configForTests){
    this._logger = lo4js.getLogger('app');
    this._logger.level = 'debug';

    this._server = service;
    this._httpServer = null;
    this._config = configForTests || configuration;
    this._db = null;
  }

  get start() {
    return this._start.bind(this);
  }

  get server() {
    return this._server;
  }

  get stop() {
    return this._stop.bind(this);
  }

  get clearDb() {
    return this._clearDb.bind(this);
  }

  _start() {
    service.set('port', this._config.port);
    this._httpServer = http.createServer(service);
    this._httpServer.listen(this._config.port);
    this._httpServer.on('error', this._onError);
    this._httpServer.on('listening', this._onListening.bind(this));

    this._db = this._connectDatabase();
    this._db.on('error', (err) => this._logger.error(`Mongoose connection error: ${err}`));
    this._db.once('open', () => this._logger.debug('Succesfully connected to db'));

    process.on('uncaughtException', (err) => {
      this._logger.error('Unhandled exception', err);
    });
    process.on('unhandledRejection', (err) => {
      this._logger.error('Unhandled rejection', err);
    });
  }

  _stop() {
    this._httpServer.close();
    this._db.close();
  }

  async _clearDb() {
    await this._db.dropDatabase();
  }

  _onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        this._logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        this._logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  _onListening() {
    const addr = this._httpServer.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    this._logger.debug('Listening on ' + bind);
  }

  _connectDatabase() {
    mongoose.connect(this._config.db.url);

    return mongoose.connection;
  }
}