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
    official?:boolean,
    teams:string[]
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
    players:string[],
    captain?:string,
    cocaptain?:string,
    origin:string,
    upvote?:string[],
    downvote?:string[],
    followers?:string[],
    teamsize?:number,
    roster?:string[],
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
    hometeamid:string,
    hometeamname:string,
    hometeamlogo:string,
    hometeamscore:number,
    refreeid:string,
    refreename:string,
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
    pp:string
}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            mongoUri:string,
            appPath:string
        }
    }
}
