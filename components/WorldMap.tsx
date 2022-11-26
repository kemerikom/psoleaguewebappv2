'use client'
import { ComposableMap,Geographies, Geography } from "react-simple-maps"
import geoList from '../utils/src/geoList.json'
import officialLeagues from '../utils/src/officialLeagues.json'

//const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function WorldMap(){
    return(
        <ComposableMap className="max-h-full">
            <Geographies geography={geoList}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        let fill='#2563eb'
                        officialLeagues.map((ol)=>{
                            if(ol.countryCode==geo.properties["Alpha-2"]){
                                fill=ol.color
                            }
                        })
                        return(
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fill}
                            stroke="white"
                            strokeWidth={1}
                            className="outline-none"
                            />
                        )
                    })
                }
            </Geographies>
        </ComposableMap>
    )
}