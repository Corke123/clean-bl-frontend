export interface ContactUsMessage {
  id?: number;
  title: string;
  email: string;
  content: string;
  replied?: boolean;
  response?: string;
}
