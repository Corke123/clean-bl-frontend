export interface Report {
  id: number;
  userReported: string;
  description: string;
  createdAt: Date;
  status: string;
  street: string;
  partOfTheCity: string;
  department: string;
  departmentService?: string;
  valid: boolean;
  processed?: Date;
  base64Image: string;
}
