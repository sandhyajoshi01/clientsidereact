export class Contracts {
    constructor(allowedCompanies, allowedData, allowedPurpose, allowedReward, allowedCondition,contractHash,user,
                id) {
        this.allowedCompanies = allowedCompanies;
        this.allowedData = allowedData;
        this.allowedPurpose = allowedPurpose;
        this.allowedReward = allowedReward;
        this.allowedCondition = allowedCondition;
        this.contractHash = contractHash;
        this.user = user
        this.id = id;
    }
}
