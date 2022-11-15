import { Int32, ObjectId } from "mongodb"
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

export type seasonNameType={
    _id:string,
    leagueId:string,
    seasonName:string
}

export type tableTeamType={
    id:string,
    teamname:string
}

export type tableScheduleType={
    datetime:number,
    homescore:number,
    awayscore:number,
    hometeam:string,
    awayteam:string,
    completed:boolean
}

export type tableTopGoalsType={
    playername:string,
    playerid:string,
    goals:number
}

export type tableTopAssistsType={
    playername:string,
    playerid:string,
    assists:number
}

export type tableTopSavesType={
    playername:string,
    playerid:string,
    saves:number
}

export type tableTopPlayersType={
    topgoals:tableTopGoalsType[],
    topassists:tableTopAssistsType[],
    topsaves:tableTopSavesType[]
}

export type tablePointsType={
    teamname:string,
    point:number,
    win:number,
    draw:number,
    lose:number,
    goals:number,
    agoals:number,
    diff:number
}


export type seasonTableType={
    _id:string,
    seasonId:string,
    teams:tableTeamType[],
    points:tablePointsType[],
    schedule:tableScheduleType[],
    topplayers:tableTopPlayersType[]

}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            mongoUri:string,
            appPath:string
        }
    }
}
