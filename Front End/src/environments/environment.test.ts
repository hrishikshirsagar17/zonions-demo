import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
    production: false,
    logging: {
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  };
