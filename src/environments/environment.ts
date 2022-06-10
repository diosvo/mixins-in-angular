// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  jsonPlaceHolderUrl: 'https://jsonplaceholder.typicode.com/',
  firebase: {
    projectId: 'mixins-in-angular',
    appId: '1:942092830389:web:a72951b483792c243d60fc',
    databaseURL: 'https://mixins-in-angular-default-rtdb.firebaseio.com',
    storageBucket: 'mixins-in-angular.appspot.com',
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'mixins-in-angular.firebaseapp.com',
    messagingSenderId: '942092830389',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
