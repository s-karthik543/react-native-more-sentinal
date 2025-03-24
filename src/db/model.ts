import SQLite from 'react-native-sqlite-storage';

export interface Queries {
  statement?: string;
  params?: Array<any>;
}

export interface SQLiteResult {
  success?: boolean;
  error?: boolean;
  results?: SQLite.ResultSet;
}

export interface Location {
  latitude: number;
  longitude: number;
}
