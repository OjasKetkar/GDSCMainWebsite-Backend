export interface INewMember{
    fullname:string,
    email:string,
    linkedInProfile:string,
    role:string,
    position:string,
    githubProfile:string,
    mobileNumber:number,
    year:number,
    team:string
}

export interface IEditMember{
    id:string,
    fullname:string,
    email:string,
    linkedInProfile:string,
    role:string,
    position:string,
    githubProfile:string,
    mobileNumber:number,
    year:number,
    team:string,
    image:string,
    imageIsUpdated:string
}