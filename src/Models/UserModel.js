export class User {
  constructor(firstname,lastname,username, email,password,billingAddress,etherAddress,id, token,role){
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email=email;
    this.password = password;
    this.billingAddress = billingAddress;
    this.etherAddress = etherAddress;
    this.id = id;
    this.token= token;
    this.role = role;
  }
}