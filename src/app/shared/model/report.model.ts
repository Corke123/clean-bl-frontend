export interface Report {
  id: number;
  userReported: string;
  description: string;
  createdAt: Date;
  status: string;
  street: string;
  partOfTheCity: string;
  department: string;
  base64Image: string;
}
