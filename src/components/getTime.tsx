export default function getTime(){ 
    //getting variables
    
    const now = new Date()
    
    let dd: string | number = now.getDate()
    const day = dd
    
    let mm: string | number = now.getMonth()
    const month = mm
    
    let year = now.getFullYear()
    
    //updating some variables because each day has it's own id number mmddyyyy
    if(dd < 10){
        dd = "0"+ dd
    }
    if(mm <10){
        mm = "0" + mm
    }
      
    // finalizing variables for state/props
    const historyID =  now
    const currentTime = now.toLocaleTimeString("en-us", {timeStyle:'short'})
    const displayDate = now.toLocaleDateString("en-us")
    
    const timeObj = {day, month, year, historyID, currentTime, displayDate}
    
    return timeObj
}