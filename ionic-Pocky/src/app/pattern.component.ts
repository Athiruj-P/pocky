import { DatabaseService } from 'src/app/services/database.service';

export class Account {
    private username: string;
    private password: string;
    public databaseService: DatabaseService;
    public check: boolean;
    // private wallet:Wallet[];
    // constructor(databaseService: DatabaseService) {
    //     this.databaseService = databaseService;
    // }

    setUsername(username: string) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    login() {
        var json = {
            "username": this.username,
            "password": this.password,
        };
        var promise = new Promise((resolve, reject) => {
            this.databaseService.login_varification(json).subscribe(res => {
                if (Object.keys(res).length == 0) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
        });
        return promise;
    }

    register() {
        var json = {
            "username": this.username,
            "password": this.password,
        };
        var promise = new Promise((resolve, reject) => {
            this.databaseService.register_validation(json).subscribe(res => {
                if (Object.keys(res).length > 0) {
                    reject(false);
                } else {
                    this.databaseService.add_new_user(json).subscribe(() => {
                        resolve(true);
                    });
                }
            })

        });
        return promise;
    }
}

export class Currency {
    private name: string;
    private nameAbb: string;

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setNameAbb(nameAbb) {
        this.nameAbb = nameAbb;
    }

    getNameAbb() {
        return this.nameAbb;
    }
}

/**
  ______         _                     __  __      _   _               _  __          __   _ _      _   
 |  ____|       | |                   |  \/  |    | | | |             | | \ \        / /  | | |    | |  
 | |__ __ _  ___| |_ ___  _ __ _   _  | \  / | ___| |_| |__   ___   __| |  \ \  /\  / /_ _| | | ___| |_ 
 |  __/ _` |/ __| __/ _ \| '__| | | | | |\/| |/ _ \ __| '_ \ / _ \ / _` |   \ \/  \/ / _` | | |/ _ \ __|
 | | | (_| | (__| || (_) | |  | |_| | | |  | |  __/ |_| | | | (_) | (_| |    \  /\  / (_| | | |  __/ |_ 
 |_|  \__,_|\___|\__\___/|_|   \__, | |_|  |_|\___|\__|_| |_|\___/ \__,_|     \/  \/ \__,_|_|_|\___|\__|
                                __/ |                                                                   
                               |___/                                                                    
 */

abstract class WalletFactory {
    public abstract createWallet(): Wallet;
}

class PersonalWalletFactory extends WalletFactory {
    public createWallet(): Wallet {
        return new PersonalWallet();
    }
}

interface Wallet {
    walletName: string;
    currency: Currency;
    totalBanance: number;
    transaction: Transaction[];

    setWalletName(name): void;
    getWalletName(): string;
    setCurrency(currency): void;
    getCurrency(): Currency;
    updateTotalBalance(): void;
    getTotalBalance(): number;
    addTransaction(transaction: Transaction): void;
    removeTransaction(index): void;
    getTransaction(): Transaction[];
}

class PersonalWallet implements Wallet {
    walletName: string;
    currency: Currency;
    totalBanance: number;
    transaction: Transaction[];

    setWalletName(name): void {
        this.walletName = name;
    }

    getWalletName(): string {
        return this.walletName;
    }

    setCurrency(currency): void {
        this.currency = currency;
    }

    getCurrency(): Currency {
        return this.currency;
    }

    updateTotalBalance(): void {
        this.totalBanance = this.transaction.reduce(function (prev, cur) {
            return prev + cur.getAmount();
        }, 0);
    }

    getTotalBalance(): number {
        return this.totalBanance;
    }

    addTransaction(transaction: Transaction): void {
        this.transaction.push(transaction);
        this.updateTotalBalance();
    }

    removeTransaction(index): void {
        this.transaction.splice(index, 1);
        this.updateTotalBalance();
    }

    getTransaction(): Transaction[] {
        return this.transaction;
    }
}

/**
  ___        _                  __  __     _   _            _   _____                          _   _          
 | __|_ _ __| |_ ___ _ _ _  _  |  \/  |___| |_| |_  ___  __| | |_   _| _ __ _ _ _  ___ __ _ __| |_(_)___ _ _  
 | _/ _` / _|  _/ _ \ '_| || | | |\/| / -_)  _| ' \/ _ \/ _` |   | || '_/ _` | ' \(_-</ _` / _|  _| / _ \ ' \ 
 |_|\__,_\__|\__\___/_|  \_, | |_|  |_\___|\__|_||_\___/\__,_|   |_||_| \__,_|_||_/__/\__,_\__|\__|_\___/_||_|
                         |__/                                                                                                                                          
 */

abstract class TransactionFactory {
    public abstract createTran(): Transaction;
}

class ExpenditureFactory extends TransactionFactory {

    public createTran(): Transaction {
        return new Expenditure();
    }
}

class IncomeFactory extends TransactionFactory {
    public createTran(): Transaction {
        return new Income();
    }
}

interface Transaction {
    descripttion: string;
    amount: number;
    dataTime: Date;

    setDescription(des): void;
    getDescription(): string;
    setAmount(amount): void;
    getAmount(): number;
    setDateTime(dataTime): void;
    getDateTime(): Date;

}

class Expenditure implements Transaction {
    descripttion: string;
    amount: number;
    dataTime: Date;

    setDescription(des): void {
        this.setDescription = des;
    }

    getDescription(): string {
        return this.descripttion;
    }

    setAmount(amount): void {
        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

    setDateTime(dataTime): void {
        this.dataTime = dataTime;
    }

    getDateTime(): Date {
        return this.dataTime;
    }
}

class Income implements Transaction {
    descripttion: string;
    amount: number;
    dataTime: Date;

    setDescription(des): void {
        this.setDescription = des;
    }

    getDescription(): string {
        return this.descripttion;
    }

    setAmount(amount): void {
        this.amount = amount;
    }

    getAmount(): number {
        return -1*this.amount;
    }

    setDateTime(dataTime): void {
        this.dataTime = dataTime;
    }

    getDateTime(): Date {
        return this.dataTime;
    }
}
