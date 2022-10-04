export type Photo = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; raw: string; small: string };
    color: string | null;
    user: {
      username: string;
      name: string;
    };
  };
export type WeatherInfo = {
    name: string,
    main: {
      temp:number
    },
    weather: WeatherObject[]
  }
export type WeatherObject = {
    icon:string
  }
export type TimeObject = {
    day: number;
    month: number;
    year: number;
    historyID: Date;
    currentTime: string;
    displayDate: string;
  }
export interface WeatherProps{
    weatherInfo: WeatherInfo | null
 }