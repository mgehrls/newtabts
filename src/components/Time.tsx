import { TimeObject } from "../utils/types"

type TimeProps = {
    time: TimeObject | null
}

export default function Time({time}: TimeProps){
    if(time !== null){
        return(
            <div id="time-container">
                <h1 className="time-display">{time.currentTime}</h1>
                <h3 className="date-display">{time.displayDate}</h3>
            </div>
        )
    }else{
        return(
            <div id="time-container">
                <h1 className="time-display"> </h1>
                <h3 className="date-display"> </h3>
            </div>
        )
    }
}