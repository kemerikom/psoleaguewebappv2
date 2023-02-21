import { Int32, ObjectId } from "mongodb"
import { type } from "os"
import React, { Component, Dispatch } from "react"

export type firebaseConfigType={
    apiKey:string,
    authDomain:string,
    projectId:string,
    storageBucket:string,
    messagingSenderId:string,
    appId:string,
    measurementId:string
}

export type notificationType = {
    id: string,
    title: string,
    href: string
}

export type siteDataType={
    uid:string|null,
    user:any,
    login:boolean,
    notifications: notificationType[],
    setNotifications: Dispatch<notificationType[]>
}


export type mongoType={
    uri:string
}

export type userNameIdType ={
    id:string,
    username:string
}

export type teamNameIdType={
    _id:string,
    name:string,
    shortname:string,
    color1:string,
    color2:string,
    fontcolor:string,
    logo:string
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


export type leagueType={
    _id:string,
    name:string,
    logo:string,
    color1:string,
    color2:string,
    fontcolor:string,
    shortname?:string,
    official?:boolean,
    teams:teamNameIdType[],
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
    seasonname:string,
    seasonId:string,
    leagueId:string,
    teams:tableTeamType[],
    points:tablePointsType[],
    schedule:tableScheduleType[],
    topplayers:{
        topgoals:tableTopGoalsType[],
        topassists:tableTopAssistsType[],
        topsaves:tableTopSavesType[],
    }
}

export type teamsType={
    _id:string,
    name:string,
    shortname:string,
    color1:string,
    color2:string,
    fontcolor:string,
    logo?:string,
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
    steamid?:string,
    avatar?:{
        small?:string,
        medium?:string,
        large?:string
    },
    discordid?:string,
    discordname?:string,
    pp?:string,
    country:string,
    followers?:string[],
    upvote?:string[],
    downvote?:string[],
    mainpos:string,
    secondpos:string,
    card?:string
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
    user: {
        id:string,
        username:string,
        avatar?:string
    },
    from?:{
        id:string,
        teamname:string,
        logo?:string
    },
    to?:{
        id:string,
        teamname:string,
        logo?:string
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

export type offerType = {
    _id:string,
    fromteam: {
        id:string,
        teamname:string,
        logo:string
    },
    toteam?: {
        id: string,
        teamname: string,
        logo: string
    },
    toplayer: {
        id: string,
        username: string,
        avatar: string
    },
    acceptplayer: boolean,
    rejectplayer: boolean,
    acceptteam: boolean,
    rejectteam: boolean,

    datetime: number,
    bot: boolean
}

export type LookingForTeamType = {
    _id: string,
    username: string,
    userid: string,
    mainpos?: string,
    secpos?: string,
    avatar?: string,
    country?: string,
    datetime: number
}


export type lookingForPlayerType = {
    _id: string | ObjectId,
    teamid: string,
    teamname: string,
    teamlogo?: string,
    positions: string[],
    datetime: number,
}

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            mongoUri: string,
            appPath: string,
            ironCookie: string,
            ironPassword: string,
            steamApiKey: string,
            discordClientId: string,
            discordClientSecret: string,
            discordApiEndpoint: string,
            discordGeneratedUrl: string,
            storagePath: string
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
