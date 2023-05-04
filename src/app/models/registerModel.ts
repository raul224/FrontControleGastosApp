export class RegisterModel{
  name: string;
  email: string;
  password: string;
  passwordValidation: string;

  constructor(){
    this.name = '',
    this.email = '',
    this.password = '',
    this.passwordValidation = ''
  }
}
