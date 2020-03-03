import { DatabaseService } from 'src/app/services/database.service';
import 'rxjs/add/operator/map';
export class Account {
    private ac_id: number;
    private username: string;
    private password: string;
    public databaseService: DatabaseService;
    private wallet = [];

    setUsername(username: string) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getId() {
        return this.ac_id;
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
                    this.ac_id = res[0].ac_id;
                    this.databaseService.get_wallet_by_ac_id({ ac_id: this.ac_id }).subscribe(res => {
                        res = res[0];
                        if (Object.keys(res).length > 0) {
                            this.databaseService.get_wallet_by_ac_id({ ac_id: this.ac_id }).subscribe(res_wal => {
                                // res_wal = res_wal[0];
                                console.log(JSON.stringify(res_wal, null, 4));
                                if (Object.keys(res_wal).length > 0) {
                                    res_wal.forEach(val_wal => {
                                        var tmpWal = new PersonalWallet;
                                        var tmpCurrency = new Currency;
                                        tmpCurrency.setName(val_wal.cur_name);
                                        tmpCurrency.setNameAbb(val_wal.cur_name_abb);
                                        tmpWal.setId(val_wal.wal_id);
                                        tmpWal.setWalletName(val_wal.wal_name);
                                        tmpWal.setCurrency(tmpCurrency);
                                        tmpWal.setTotalBalance(val_wal.wal_money);
                                        this.databaseService.get_transaction_by_wal_id({ wal_id: val_wal.wal_id }).subscribe(res_tran => {
                                            res_tran.forEach(val_tran => {
                                                var tmp_tran = val_tran.tran_type == 1 ? new Income : new Expenditure;
                                                tmpWal.addTransaction(tmp_tran);
                                            });
                                        })
                                        console.log("===== temp =====");
                                        console.log(JSON.stringify(tmpWal, null, 4));
                                        this.wallet.push(tmpWal);
                                        console.log("===== wallet =====");
                                        console.log(JSON.stringify(this.wallet, null, 4));
                                    });
                                }
                                resolve(true);
                            })
                        } else {
                            resolve(true);
                        }
                    })
                }
            });
        });
        return promise;
    }

    loadWallet() {
        this.databaseService.get_wallet_by_ac_id({ ac_id: this.ac_id }).subscribe(res => {
            res = res[0];
            if (Object.keys(res).length > 0) {
                this.databaseService.get_wallet_by_ac_id({ ac_id: this.ac_id }).subscribe(res_wal => {
                    // res_wal = res_wal[0];
                    console.log(JSON.stringify(res_wal, null, 4));
                    res_wal.forEach(val_wal => {
                        var tmpWal = new PersonalWallet;
                        var tmpCurrency = new Currency;
                        tmpCurrency.setName(val_wal.cur_name);
                        tmpCurrency.setNameAbb(val_wal.cur_name_abb);
                        tmpWal.setId(val_wal.wal_id);
                        tmpWal.setWalletName(val_wal.wal_name);
                        tmpWal.setCurrency(tmpCurrency);
                        tmpWal.setTotalBalance(val_wal.wal_money);
                        this.databaseService.get_transaction_by_wal_id({ wal_id: val_wal.wal_id }).subscribe(res_tran => {
                            res_tran.forEach(val_tran => {
                                var tmp_tran = val_tran.tran_type == 1 ? new Income : new Expenditure;
                                tmpWal.addTransaction(tmp_tran);
                            });
                        })
                        console.log("===== temp =====");
                        console.log(JSON.stringify(tmpWal, null, 4));
                        this.wallet.push(tmpWal);
                        console.log("===== wallet =====");
                        console.log(JSON.stringify(this.wallet, null, 4));
                    });
                })
            }
        })
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

    setWallet(wallet) {
        this.wallet.push(wallet);
    }

    getWallet() {
        return this.wallet;
    }

    clearAccount() {
        this.ac_id = 0;
        this.username = "";
        this.password = "";
        this.wallet = [];
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

export abstract class WalletFactory {
    public abstract createWallet(): Wallet;
}

export class PersonalWalletFactory extends WalletFactory {
    public createWallet(): Wallet {
        return new PersonalWallet();
    }
}

export interface Wallet {
    wal_id: number;
    walletName: string;
    currency: Currency;
    totalBanance: number;
    transaction: Transaction[];

    setId(id): void;
    getId(): number;
    setWalletName(name): void;
    getWalletName(): string;
    setCurrency(currency): void;
    getCurrency(): Currency;
    setTotalBalance(money): void;
    updateTotalBalance(): void;
    getTotalBalance(): number;
    addTransaction(transaction: Transaction): void;
    removeTransaction(index): void;
    getTransaction(): Transaction[];
}

export class PersonalWallet implements Wallet {
    wal_id: number;
    walletName: string;
    currency: Currency;
    totalBanance: number;
    transaction: Transaction[];

    setId(id): void {
        this.wal_id = id;
    }

    getId(): number {
        return this.wal_id;
    }

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

    setTotalBalance(money): void {
        this.totalBanance = money;
    }

    updateTotalBalance(): void {
        this.totalBanance = 0;
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
        return -1 * this.amount;
    }

    setDateTime(dataTime): void {
        this.dataTime = dataTime;
    }

    getDateTime(): Date {
        return this.dataTime;
    }
}
