
export class Transaction {
    constructor(user, product,proQuantity,totalPrice,transactionHash,id){
        this.user = user;
        this.product = product;
        this.proQuantity = proQuantity;
        this.totalPrice = totalPrice;
        this.transactionHash = transactionHash;
        this.id = id;
    }
}