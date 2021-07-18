export interface Report {
  id: number;
  userReported: string;
  title: string;
  description: string;
  createdAt: Date;
  status: string;
  department: string;
  longitude: number;
  latitude: number;
  departmentService?: string;
  valid: boolean;
  processed?: Date;
  base64Image: string;
}
