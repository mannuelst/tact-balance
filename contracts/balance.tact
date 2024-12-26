import "@stdlib/deploy";
import "@stdlib/ownable";

message Withdraw{
    amount: Int as coins;
}
contract Balance with Deployable, Ownable {

    balance: Int as uint256=0;
    owner: Address;

    init() {
        self.owner=sender()
    }
    
    receive("Deposit"){
        self.balance=self.balance + context().value;
    }

    receive(msg: Withdraw){
        self.requireOwner();
        require(self.balance>= msg.amount, "Too much");
        self.balance=self.balance - msg.amount;
        send(SendParameters{
            to: sender(), 
            value: msg.amount,
            mode: SendIgnoreErrors,
            body:"Get You ton".asComment()
            })
    }
    get fun balance():Int{
        return self.balance;
    }
}
