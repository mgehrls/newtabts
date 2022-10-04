export default function Time({time}){
    return(
        <div id="time-container">
            <h1 className="time-display">{time.currentTime}</h1>
            <h3 className="date-display">{time.displayDate}</h3>
        </div>
    )
}