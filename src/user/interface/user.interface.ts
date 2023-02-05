export interface UserInterface {
  _id: number;
  email: string;
  password: string;
  'password-confirmation'?: string;
}
