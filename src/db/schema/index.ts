export const EVENTS_V1 =
    'CREATE TABLE IF NOT EXISTS events( ' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'event VARCHAR(1000)' +
    ');';

    export const LOGS_V1 =
    'CREATE TABLE IF NOT EXISTS logs( ' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
    'log VARCHAR(1000)' +
    ');';