

type teamType={
    id:string,
    teamname:string
}


export default function createSchedule({teams,oneLeg,minDelay,dailyMatch,startDate}:{teams:teamType[],oneLeg?:boolean}){
    if(teams.length==3){

    }else if(teams.length==4){
        
    }else if (teams.length==5){
        const res = team5({teams,oneLeg})
        return res
    }
}


function team5({teams,oneLeg}:{teams:teamType[],oneLeg?:boolean}){
    const shuffledTeams=teams.sort(()=>Math.random()<.5?1:-1)
    const vs:any=[]
    vs.push(
        {team1:shuffledTeams[0],team2:shuffledTeams[1]},
        {team1:shuffledTeams[2],team2:shuffledTeams[3]},
        {team1:shuffledTeams[4],team2:null},
    )
    vs.push(
        {team1:shuffledTeams[3],team2:shuffledTeams[4]},
        {team1:shuffledTeams[0],team2:shuffledTeams[2]},
        {team1:shuffledTeams[1],team2:null},
    )
    vs.push(
        {team1:shuffledTeams[0],team2:shuffledTeams[3]},
        {team1:shuffledTeams[4],team2:shuffledTeams[1]},
        {team1:shuffledTeams[2],team2:null},
    )
    vs.push(
        {team1:shuffledTeams[1],team2:shuffledTeams[2]},
        {team1:shuffledTeams[0],team2:shuffledTeams[4]},
        {team1:shuffledTeams[3],team2:null},
    )
    if(!oneLeg){
        vs.push(
            {team1:shuffledTeams[4],team2:shuffledTeams[0]},
            {team1:shuffledTeams[2],team2:shuffledTeams[1]},
            {team1:shuffledTeams[3],team2:null},
        )
        vs.push(
            {team1:shuffledTeams[1],team2:shuffledTeams[4]},
            {team1:shuffledTeams[3],team2:shuffledTeams[0]},
            {team1:shuffledTeams[2],team2:null},
        )
        vs.push(
            {team1:shuffledTeams[2],team2:shuffledTeams[0]},
            {team1:shuffledTeams[4],team2:shuffledTeams[3]},
            {team1:shuffledTeams[1],team2:null},
        )
        vs.push(
            {team1:shuffledTeams[3],team2:shuffledTeams[2]},
            {team1:shuffledTeams[1],team2:shuffledTeams[0]},
            {team1:shuffledTeams[4],team2:null},
        )
    }
    return vs
}
