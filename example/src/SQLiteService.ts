// import SQLite from 'react-native-sqlite-storage';
// import type { Queries, SQLiteResult } from './model';

// export const runSqlTransaction = (
//   db: SQLite.SQLiteDatabase,
//   queries: Array<Queries>
// ): Promise<SQLiteResult> => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx:SQLite.Transaction) => {
//       queries.map((query) => {
//         if (query.statement) {
//           tx.executeSql(query.statement, query.params);
//         }
//       });
//     })
//       .then(() => {
//         resolve({ success: true, error: false });
//       })
//       .catch((error: Error) => {
//         reject({
//           success: false,
//           error,
//         });
//       });
//   });
// };

// export const runSqlQuery = (
//   db: SQLite.SQLiteDatabase,
//   query: string,
//   params: Array<any> = []
// ): Promise<SQLiteResult> => {
//   return new Promise((resolve, reject) => {
//     db.executeSql(query, params)
//       .then((results: [SQLite.ResultSet]) => {
//         resolve({
//           success: true,
//           error: false,
//           results: results[0],
//         });
//       })
//       .catch((error) => {
//         reject({
//           success: false,
//           error,
//         });
//       });
//   });
// };
