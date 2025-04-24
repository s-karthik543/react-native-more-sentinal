import SQLite from 'react-native-sqlite-storage';
import { EVENTS_V1, LOGS_V1 } from './schema';
import { runSqlTransaction, runSqlQuery } from './SQLiteService';
import type { Queries } from './model';

SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

class SQLiteInstance {
  static instance?: SQLiteInstance;
  static database?: SQLite.SQLiteDatabase;

  constructor() {
    if (!SQLiteInstance.instance) {
      this.openDB();
      SQLiteInstance.instance = this;
    }
    return SQLiteInstance.instance;
  }

  openDB() {
    SQLite.openDatabase({
      name: 'sentinal.db',
      location: 'default',
    })
      .then((database: SQLite.SQLiteDatabase) => {
        SQLiteInstance.database = database;
      })
      .catch((error) => {
        if (__DEV__) {
          console.log('Failed to initiate DB ', error);
        }
      });
  }

  closeDB() {
    SQLiteInstance.database
      ?.close?.()
      ?.then(() => {
        if (__DEV__) {
          console.log('Close DB status ');
        }
      })
      ?.catch((error) => {
        if (__DEV__) {
          console.log('Close DB error ', error);
        }
      });
  }

  populateDB(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const queries: Array<Queries> = [
          {
            statement: EVENTS_V1,
            params: [],
          },
          {
            statement: LOGS_V1,
            params: [],
          },
        ];
        runSqlTransaction(SQLiteInstance.database, queries).then((response) => {
          if (__DEV__) {
            console.log('populateDB ', response);
          }
          resolve(true);
        });
      } else {
        reject();
      }
    });
  }

  saveEvents(eventData: string) {
    if (eventData) {
      if (SQLiteInstance.database) {
        // const statements = [];
        // const statement: Array<> = [
        //   'INSERT OR REPLACE INTO events ( ' + 'event ) VALUES' + '(?)',
        //   [eventData],
        // ];
        // statements.push(statement);
        runSqlQuery(
          SQLiteInstance.database,
          'INSERT OR REPLACE INTO events ( ' + 'event ) VALUES' + '(?)',
          [eventData]
        )
          .then((response) => {
            if (__DEV__) {
              console.log('Save events response ', response);
            }
          })
          .catch((error) => {
            if (__DEV__) {
              console.log('Save events error ', error);
            }
          });
      }
    }
  }

  saveLogs(logs: string) {
    if (logs) {
      if (SQLiteInstance.database) {
        runSqlQuery(
          SQLiteInstance.database,
          'INSERT OR REPLACE INTO logs ( ' + 'log ) VALUES' + '(?)',
          [logs]
        )
          .then((response) => {
            if (__DEV__) {
              console.log('Save logs response ', response);
            }
          })
          .catch((error) => {
            if (__DEV__) {
              console.log('Save logs error ', error);
            }
          });
      }
    }
  }

  getEvents(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = 'SELECT * FROM events';
        runSqlQuery(SQLiteInstance.database, statement)
          .then((response) => {
            const { success, error, results } = response;
            if (success && results?.rows) {
              const resultData = [];
              for (let i = 0; i < results.rows.length; i++) {
                resultData.push(results.rows.item(i));
              }
              resolve(resultData);
            } else if (error) {
              reject({ message: error });
            } else {
              reject({ message: 'Database failed' });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }

  getLogs(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = 'SELECT * FROM logs';
        runSqlQuery(SQLiteInstance.database, statement)
          .then((response) => {
            const { success, error, results } = response;
            if (success && results?.rows) {
              const resultData = [];
              for (let i = 0; i < results.rows.length; i++) {
                resultData.push(results.rows.item(i));
              }
              resolve(resultData);
            } else if (error) {
              reject({ message: error });
            } else {
              reject({ message: 'Database failed' });
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }

  deleteEventId(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = `DELETE FROM events where id=${id}`;
        runSqlQuery(SQLiteInstance.database, statement).then((response) => {
          const { success, error } = response;
          if (success) {
            resolve(true);
          } else if (error) {
            reject({ message: error });
          } else {
            resolve(false);
          }
        });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }

  deleteLogsId(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = `DELETE FROM logs where id=${id}`;
        runSqlQuery(SQLiteInstance.database, statement).then((response) => {
          const { success, error } = response;
          if (success) {
            resolve(true);
          } else if (error) {
            reject({ message: error });
          } else {
            resolve(false);
          }
        });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }

  deleteAllEvents() {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = 'DELETE FROM events';
        runSqlQuery(SQLiteInstance.database, statement).then((response) => {
          const { success, error } = response;
          if (success) {
            resolve(true);
          } else if (error) {
            reject({ message: error });
          } else {
            resolve(false);
          }
        });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }

  deleteAllLogs() {
    return new Promise((resolve, reject) => {
      if (SQLiteInstance.database) {
        const statement = 'DELETE FROM logs';
        runSqlQuery(SQLiteInstance.database, statement).then((response) => {
          const { success, error } = response;
          if (success) {
            resolve(true);
          } else if (error) {
            reject({ message: error });
          } else {
            resolve(false);
          }
        });
      } else {
        reject({ message: 'Database failed' });
      }
    });
  }
}

const DBInstance = new SQLiteInstance();
Object.freeze(DBInstance);

export default DBInstance;
