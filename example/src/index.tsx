// import { Platform, PermissionsAndroid } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import uuid from 'react-native-uuid';
// import Geolocation from 'react-native-geolocation-service';
// import { check, PERMISSIONS } from 'react-native-permissions';
// import SQLiteDB from './SQLiteDB';
// import type { Location } from './model';

// const sessionId = uuid.v4();

// export default class AnalyticsManager {
//   static env?: string;
//   static userId?: string;

//   static setUserId(id?: string) {
//     AnalyticsManager.userId = id;
//   }

//   static getDeviceLocation(): Promise<Location> {
//     return new Promise((resolve) => {
//       if (Platform.OS === 'android') {
//         PermissionsAndroid.check(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         )
//           .then((result) => {
//             if (result) {
//               Geolocation.getCurrentPosition(
//                 (position) => {
//                   resolve({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                   });
//                 },
//                 (error) => {
//                   resolve({ latitude: 0, longitude: 0 });
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//               );
//             } else {
//               resolve({ latitude: 0, longitude: 0 });
//             }
//           })
//           .catch((error: any) => {
//             resolve({ latitude: 0, longitude: 0 });
//           });
//       } else {
//         check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//           .then((result) => {
//             if (result === 'granted') {
//               Geolocation.getCurrentPosition(
//                 (position) => {
//                   resolve({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                   });
//                 },
//                 (error) => {
//                   resolve({ latitude: 0, longitude: 0 });
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//               );
//             } else {
//               resolve({ latitude: 0, longitude: 0 });
//             }
//           })
//           .catch((error) => {
//             resolve({ latitude: 0, longitude: 0 });
//           });
//       }
//     });
//   }

//   static async sendDataToServer(event: string, payload: {}) {
//     const deviceID = await DeviceInfo.getUniqueId();
//     const manufacturer = await DeviceInfo.getDeviceName();
//     const carrier = await DeviceInfo.getCarrier();
//     const isEmulator = await DeviceInfo.isEmulator();
//     const batteryLevel = await DeviceInfo.getBatteryLevel();
//     const isCharging = await DeviceInfo.isBatteryCharging();
//     // const idfa = await ReactNativeIdfaAaid.getAdvertisingInfo();
//     const location = await AnalyticsManager.getDeviceLocation();
//     const eventData: any = {
//       event: event,
//       env: AnalyticsManager.env,
//       timestamp: Date.now(),
//       user_id: AnalyticsManager.userId || null,
//       sessionId: sessionId,
//       properties: payload,
//       context: {
//         // advertisingId: idfa?.id,
//         device_id: deviceID,
//         os: Platform.OS,
//         os_version: `${Platform.Version}`,
//         device_model: DeviceInfo.getModel(),
//         manufacturer: manufacturer,
//         carrier: carrier,
//         app_version: DeviceInfo.getVersion(),
//         app_name: DeviceInfo.getApplicationName(),
//         is_emulator: isEmulator,
//         battery_level: batteryLevel,
//         is_charging: isCharging,
//       },
//     };
//     if (location?.latitude > 0 && location?.longitude > 0) {
//       eventData.latitude = location?.latitude;
//       eventData.longitude = location?.longitude;
//     }
//     // const eventStreamingAPI = new EventStreamingAPI();
//     // try {
//     //   const resp = await eventStreamingAPI.sendEvents(eventData);
//     //   if (!resp.data?.success) {
//     //     SQLiteDB.saveEvents(JSON.stringify(eventData));
//     //   }
//     // } catch (error) {
//       SQLiteDB.saveEvents(JSON.stringify(eventData));
//     // }
//   }

//   static async syncOfflineData() {
//     const offlineEvents = await SQLiteDB.getEvents();
//     if (Array.isArray(offlineEvents) && offlineEvents.length > 0) {
//       // const eventStreamingAPI = new EventStreamingAPI();
//       for (let eventData of offlineEvents) {
//         const { id, event } = eventData;
//         if (event) {
//         //   try {
//         //     const resp = await EventStreaming.sendEvents(JSON.parse(event));
//         //     if (resp.data?.success) {
//         //       await SQLiteDB.deleteEventId(id);
//         //     }
//         //   } catch (error) {
//         //     if (__DEV__) {
//         //       console.log('Offline sync error ', error);
//         //     }
//         //   }
//         } else {
//           await SQLiteDB.deleteEventId(id);
//         }
//       }
//     }
//   }
// }
