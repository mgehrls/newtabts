export type Picture = {
  id:string,
  width:number,
  height:number,
  description:string,
  urls:{
    regular:string
  },
  links:{
    self:string
  },
  user:{
    name:string,
    links:{
      self:string
    },

  }
}

export const firstPic: Picture =  {
  "id": "jFCViYFYcus",
  "width": 2560,
  "height": 1705,
  "description": "Beautiful woodland path",
  "urls": {
    "regular": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTE4MDd8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY2NDk4MDc1OA&ixlib=rb-1.2.1&q=80&w=1080",
  },
  "links": {
    "self": "https://api.unsplash.com/photos/jFCViYFYcus"
  },
  "user": {
    "name": "Lukasz Szmigiel",
    "links": {
      "self": "https://api.unsplash.com/users/szmigieldesign"
    }
  }}