
export class Transaction {
    constructor(user, order, billingAddress, etherAddress,purchaseDate,totalPrice, id){
        this.user = user;
        this.order = order;
        this.billingAddress = billingAddress;
        this.etherAddress = etherAddress;
        this.purchaseDate = purchaseDate;
        this.totalPrice = totalPrice;
        this.id = id;
    }
}