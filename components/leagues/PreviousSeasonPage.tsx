
import { seasonTableType } from '../../typings'
import SeasonTab from './SeasonTab'

export default function PreviousSeasonPage({season}:{season:seasonTableType}){
    return(
        <div className='flex flex-col space-y-2 items-center justify-center w-full p-2'>
            <SeasonTab
                points={season.points}
                schedule={season.schedule}
                topGoals={season.topplayers.topgoals}
                topAssists={season.topplayers.topassists}
                topSaves={season.topplayers.topsaves}
            />
        </div>
    )
}