/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental:{
    appDir:true
  },
  env:{
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    projectId: 'projectId',
    storageBucket: 'storageBucket',
    messagingSenderId: 'messagingSenderId',
    appId: 'appId',
    measurementId: 'measurementId',
    mongoUri:" mongoUri",
    appPath:'http://localhost:3000',
  }
}
