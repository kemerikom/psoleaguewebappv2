/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false, //useEffect için değiştirildi hatalı olabilir
    env:{
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.storageBucket,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
      mongoUri:process.env.mongoUri,
      appPath:process.env.appPath,
      ironPassword:process.env.ironPassword,
      ironCookie:process.env.ironCookie,
      steamApiKey:process.env.steamApiKey
    }
  }