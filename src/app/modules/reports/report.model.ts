export class Report {
  constructor(
    public id: number,
    public userReported: string,
    public description: string,
    public createdAt: Date,
    public status: string,
    public location: string,
    public department: string,
    public base64Image: string
  ) {}
}
