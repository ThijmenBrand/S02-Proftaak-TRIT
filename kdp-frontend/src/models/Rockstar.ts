interface SocialMediaTypes {
  linkedIn?:string;
  twitter?:string;
  email?:string;
  phone?:string;
}

export interface BaseRockstarShape {
  id: string;
  name: string;
}

export class RockstarShape implements BaseRockstarShape, SocialMediaTypes{
  id: string;
  name: string;
  image: string;
  description: string;
  role: string;
  linkedIn?:string;
  twitter?:string;
  email?:string;
  phone?:string;
  constructor(id: string, name: string, image: string, description: string, role: string, linkedIn?:string, twitter?:string, email?:string, phone?:string,) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.role = role;
    this.linkedIn = linkedIn;
    this.twitter = twitter;
    this.email = email;
    this.phone = phone;
  }
}
