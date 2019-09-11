export class User {
  constructor(firstname,lastname,username, email,password,address,creditCardNumber,creditCardExpiry,creditCardSecurity,id, role){
   this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email=email;
    this.password = password;
    this.address = address;
    this.creditCardNumber = creditCardNumber;
    this.creditCardExpiry = creditCardExpiry;
    this.creditCardSecurity = creditCardSecurity;
    this.id = id;
    this.role = role;
  }
}