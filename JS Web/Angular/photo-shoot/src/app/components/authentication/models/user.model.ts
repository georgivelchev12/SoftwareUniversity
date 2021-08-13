export class UserModel {
  constructor(
    public _id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public info: string,
    public phone: string,
    public imgUrl: string,
    public coverImgUrl: string,
    public photos: [Object],
    public role: string,
    public isDisabled: boolean
  ) {}
}
