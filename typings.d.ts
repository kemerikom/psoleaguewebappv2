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

export type siteDataType={
    uid:string|null,
    user:any,
    login:boolean
}


export type mongoType={
    uri:string
}

export type userNameIdType ={
    id:string,
    username:string
}

export type leagueName={
    _id:string,
    name:string,
    logo:string,
    color1:string,
    color2:string,
    fontcolor:string,
    shortname?:string,
    official?:boolean,
    teams:string[],
    region?:string,
    alive?:boolean,
    owner:string,
    admins:userNameIdType[],
    mods?:userNameIdType[],
    refrees?:userNameIdType[],
    transferend?:number,
    minteamsize?:number,
    maxteamsize?:number,
    teaminsize:string,
    invite?:boolean
}

export type leagueIdType={
    _id:string
}

export type winnerTeamType={
    teamname:string,
    teamid:string,
    teamlogo:string
}

export type seasonNameType={
    _id:string,
    leagueId:string,
    seasonName:string,
    winner:winnerTeamType[],
    alive:boolean
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

export type teamsType={
    _id:string,
    name:string,
    shortname:string,
    color1:string,
    color2:string,
    fontcolor:string,
    logo:string,
    leagues:string[],
    players:userNameIdType[],
    captain?:string,
    cocaptain?:string,
    origin:string,
    upvote?:string[],
    downvote?:string[],
    followers?:string[],
    teamsize?:number,
    roster?:number[],
    formation?:string
}

export type playerNamesType={
    _id:string,
    username:string
}

export type trophyType={
    _id:string,
    title:string,
    teamid:string,
    leagueid:string
}

export type matchType={
    _id:string,
    leagueId:string,
    hometeamid:string,
    hometeamname:string,
    hometeamlogo:string,
    hometeamscore:number,
    refreeid:string|null,
    refreename:string|null,
    awayteamid:string,
    awayteamname:string,
    awayteamlogo:string,
    awayteamscore:number,
    datetime:number,
    completed:boolean
}

export type playerType={
    _id:string,
    username:string,
    teamid:string,
    pp:string,
    country:string,
    followers?:string[],
    upvote?:string[],
    downvote?:string[],
    mainpos:string,
    secondpos:string
}

export type medalType={
    _id:string,
    title:string,
    teamid:string,
    leagueid:string,
    color1:string,
    color2:string
}

export type transferType={
    _id:string,
    userid:string,
    from:{
        teamid:string,
        teamname:string
    },
    to:{
        teamid:string,
        teamname:string,
    },
    datetime:number
}

export type regionType={
    _id:string,
    name:string,
    logo:string,
    color1:string,
    color2:string,
    fontcolor:string,
    region:string,
    admins:string[],
    mods:string[]
}

export type banType={
    _id:string,
    username:string,
    userid:string,
    leagueid?:string,
    regionid?:string,
    perma:boolean,
    datetime?:number,
    reason?:string,
    bannedtime:number
}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            mongoUri:string,
            appPath:string,
            ironCookie:string,
            ironPassword:string
        }
    }
}

declare module "iron-session"{
    interface IronSessionData{
        user?:{
            uid:string|undefined
        }
    }
}
