export interface ContactUsMessage {
  id?: number;
  title: string;
  email: string;
  content: string;
  createdAt?: Date;
  replied?: boolean;
  response?: string;
}
