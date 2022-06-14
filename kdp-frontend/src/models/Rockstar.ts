interface SocialMediaTypes {
  facebookLink: string;
  linkedInLink: string;
  twitterLink: string;
}

export interface BaseRockstarShape {
  id: string;
  name: string;
}

export class RockstarShape implements BaseRockstarShape{
  id: string;
  name: string;
  image: string;
  description: string;
  role: string;
  linkedIn?:string;
  twitter?:string;
  email:string;
  phone?:string;
  rockstarSocial?: SocialMediaTypes;
  constructor(id: string, name: string, image: string, description: string, role: string, email:string, rockstarSocial?:SocialMediaTypes) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.role = role;
    this.email = email;
    this.rockstarSocial = rockstarSocial;
  }
}
