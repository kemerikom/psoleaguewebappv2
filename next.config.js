/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental:{
    appDir:true
  },
  env:{
    apiKey: 'AIzaSyAplg7vVFBiwId0TjKXUgeinCyLQczchug',
    authDomain: 'psoleaguev2.firebaseapp.com',
    projectId: 'psoleaguev2',
    storageBucket: 'psoleaguev2.appspot.com',
    messagingSenderId: '620696940492',
    appId: '1:620696940492:web:b3b404af9e282a72fcf769',
    measurementId: 'G-MPEQ62XY32',
    mongoUri:"mongodb+srv://PSOLeagueMod:005LorD005@psoleague.wuceh5w.mongodb.net/?retryWrites=true&w=majority",
    appPath:'http://localhost:3000',
    psoApiKey:""
  }
}
