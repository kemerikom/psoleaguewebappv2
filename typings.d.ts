import { ObjectId } from "mongodb"
import React, { Component } from "react"

export type firebaseConfigType={
    apiKey:string,
    authDomain:string,
    projectId:string,
    storageBucket:string,
    messagingSenderId:string,
    appId:string,
    measurementId:string
}

export type mongoType={
    uri:string
}

export type leagueName={
    _id:string,
    id?:string,
    name:string,
    logo:string,
    color1:string,
    color2:string,
    fontcolor:string,
    shortname?:string,
    official?:boolean
}

export type leagueIdType={
    _id:string
}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            mongoUri:string,
            appPath:string
        }
    }
}
