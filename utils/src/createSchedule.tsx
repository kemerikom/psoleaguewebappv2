

type teamType={
    id:string,
    teamname:string
}


export default function createSchedule({teams,oneLeg,minDelay,dailyMatch,startDate}:{teams:teamType[],oneLeg:boolean,minDelay:number,dailyMatch:number,startDate:any}){
    if(teams.length==3){

    }else if(teams.length==4){
        
    }else if (teams.length==5){
        const res = team5({teams,oneLeg,minDelay,dailyMatch,startDate})
        return res
    }
}


function team5({teams,oneLeg,minDelay,dailyMatch,startDate}:{teams:teamType[],oneLeg:boolean,minDelay:number,dailyMatch:number,startDate:any}){
    const shuffledTeams=teams.sort(()=>Math.random()<.5?1:-1)
    const vs:any=[]
    vs.push(
        {hometeam:shuffledTeams[0].teamname,awayteam:shuffledTeams[1].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[2].teamname,awayteam:shuffledTeams[3].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[4].teamname,awayteam:null},
    )
    vs.push(
        {hometeam:shuffledTeams[0].teamname,awayteam:shuffledTeams[4].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[1].teamname,awayteam:shuffledTeams[3].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[2].teamname,awayteam:null},
    )
    vs.push(
        {hometeam:shuffledTeams[3].teamname,awayteam:shuffledTeams[4].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[1].teamname,awayteam:shuffledTeams[2].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[0].teamname,awayteam:null},
    )
    vs.push(
        {hometeam:shuffledTeams[3].teamname,awayteam:shuffledTeams[0].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[4].teamname,awayteam:shuffledTeams[2].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[1].teamname,awayteam:null},
    )
    vs.push(
        {hometeam:shuffledTeams[2].teamname,awayteam:shuffledTeams[0].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[4].teamname,awayteam:shuffledTeams[1].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
        {hometeam:shuffledTeams[3].teamname,awayteam:null},
    )
    if(!oneLeg){
        vs.push(
            {hometeam:shuffledTeams[1].teamname,awayteam:shuffledTeams[4].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[0].teamname,awayteam:shuffledTeams[2].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[3].teamname,awayteam:null},
        )
        vs.push(
            {hometeam:shuffledTeams[2].teamname,awayteam:shuffledTeams[4].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[0].teamname,awayteam:shuffledTeams[3].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[1].teamname,awayteam:null},
        )
        vs.push(
            {hometeam:shuffledTeams[2].teamname,awayteam:shuffledTeams[1].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[4].teamname,awayteam:shuffledTeams[3].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[0].teamname,awayteam:null},
        )
        vs.push(
            {hometeam:shuffledTeams[3].teamname,awayteam:shuffledTeams[1].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[4].teamname,awayteam:shuffledTeams[0].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[2].teamname,awayteam:null},
        )
        vs.push(
            {hometeam:shuffledTeams[3].teamname,awayteam:shuffledTeams[2].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[1].teamname,awayteam:shuffledTeams[0].teamname,completed:false, homescore:0,awayscore:0,datetime:0},
            {hometeam:shuffledTeams[4].teamname,awayteam:null},
        )
    }
    const tempData=vs.filter((v:any)=>v.awayteam!=null)
    const result = reSchedule({tempData,startDate,dailyMatch,minDelay})
    return result
}


function reSchedule({tempData,startDate,dailyMatch,minDelay}:{tempData:any,startDate:any,dailyMatch:number,minDelay:number}){
    const data:any=[]
    var daily=1
    var day=0
    var date=new Date(startDate)
    let l=0
    while(l<tempData.length){
        try {
            while(daily<=dailyMatch||l<tempData.lenght){
                var dateTime=new Date(startDate)
                dateTime.setDate(date.getDate()+day)
                dateTime.setMinutes(date.getMinutes()+((daily-1)*minDelay))
                let newDate=new Date(dateTime).getTime()
                const d={
                    hometeam:tempData[(day*dailyMatch)+daily-1].hometeam,
                    awayteam:tempData[(day*dailyMatch)+daily-1].awayteam,
                    completed:false,
                    homescore:0,
                    awayscore:0,
                    datetime:newDate
                }
                data.push(d)
                daily++
                l++
            }
        } catch (error) {
            
        }finally{
            daily=1
            day++
        }
    }
    return data
}