export class User {
    constructor(firstname, lastname, username, email, password, billingAddress, etherAddress,
                allowedCompanies, allowedData, allowedPurpose, allowedReward, allowedCondition,
                id, token, role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.billingAddress = billingAddress;
        this.etherAddress = etherAddress;
        this.allowedCompanies = allowedCompanies;
        this.allowedData = allowedData;
        this.allowedPurpose = allowedPurpose;
        this.allowedReward = allowedReward;
        this.allowedCondition = allowedCondition;
        this.id = id;
        this.token = token;
        this.role = role;
    }
}
