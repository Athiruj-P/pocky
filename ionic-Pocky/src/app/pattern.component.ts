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
                        // res = res[0];
                        // console.log(JSON.stringify(res, null, 4));
                        if (Object.keys(res).length > 0) {
                            this.databaseService.get_wallet_by_ac_id({ ac_id: this.ac_id }).subscribe(res_wal => {
                                // res_wal = res_wal[0];
                                // console.log(JSON.stringify(res_wal, null, 4));
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

                                        // console.log("===== temp =====");
                                        // console.log(JSON.stringify(tmpWal, null, 4));
                                        this.wallet.push(tmpWal);
                                        // console.log("===== wallet =====");
                                        // console.log(JSON.stringify(this.wallet, null, 4));
                                    });
                                    resolve(true);
                                } else {
                                    resolve(true);
                                }
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

    loadWallet(wal_id) {
        var promise = new Promise((resolve, reject) => {
            var transaction = [];
            this.databaseService.get_transaction_by_wal_id({ wal_id: wal_id }).subscribe(res_tran => {
                if (Object.keys(res_tran).length > 0) {
                    res_tran.forEach(val_tran => {
                        var tmp_tran = val_tran.tran_type == 1 ? new Income : new Expenditure;
                        // console.log(`pattern => ID => ${val_tran.tran_id}`)
                        tmp_tran.setTransactionId(val_tran.tran_id);
                        tmp_tran.setDescription(val_tran.tran_name);
                        tmp_tran.setAmount(val_tran.tran_amount);
                        tmp_tran.setDateTime(val_tran.tran_date);
                        transaction.push(tmp_tran);
                    });
                    resolve(transaction);
                } else {
                    reject();
                }
            })
        })
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
                    this.databaseService.add_new_user(json).subscribe(res => {
                        this.ac_id = res[0].ac_id;
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
    setId(id): void;
    getId(): number;
    setWalletName(name): void;
    getWalletName(): string;
    setCurrency(currency): void;
    getCurrency(): Currency;
    setTotalBalance(money): void;
    updateTotalBalance(): any;
    getTotalBalance(): number;
    addTransaction(transaction: Transaction): void;
    removeTransaction(index): void;
    getTransaction(): Transaction[];
}

export class PersonalWallet implements Wallet {
    wal_id: number;
    walletName: string;
    currency: Currency;
    totalBalance: number;
    transaction = [];

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
        this.totalBalance = money;
    }

    updateTotalBalance(): any {
        var promise = new Promise((resolve, reject) => {
            this.totalBalance = 0;
            this.transaction.forEach(val => {
                this.totalBalance += val.getAmount();
            });
            resolve(this.totalBalance);
        })

        return promise;
    }

    getTotalBalance(): number {
        return this.totalBalance;
    }

    addTransaction(transaction: Transaction): void {
        this.transaction.unshift(transaction);
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

export class ExpenditureFactory extends TransactionFactory {

    public createTran(): Transaction {
        return new Expenditure();
    }
}

export class IncomeFactory extends TransactionFactory {
    public createTran(): Transaction {
        return new Income();
    }
}

export interface Transaction {
    setTransactionId(id): void
    getTransactionId(): number
    setDescription(des): void;
    getDescription(): string;
    setAmount(amount): void;
    getAmount(): number;
    setDateTime(dataTime): void;
    getDateTime(): string;
}

export class Expenditure implements Transaction {
    tran_id: number
    descripttion: string;
    amount: number;
    dataTime: string;

    setTransactionId(id): void {
        this.tran_id = id;
    }
    getTransactionId(): number {
        return this.tran_id;
    }

    setDescription(des): void {
        this.descripttion = des;
    }

    getDescription(): string {
        return this.descripttion;
    }

    setAmount(amount): void {
        this.amount = amount;
    }

    getAmount(): number {
        return -this.amount;
    }

    setDateTime(dataTime): void {
        this.dataTime = dataTime;
    }

    getDateTime(): string {
        return this.dataTime;
    }
}

export class Income implements Transaction {
    tran_id: number;
    descripttion: string;
    amount: number;
    dataTime: string;

    setTransactionId(id): void {
        this.tran_id = id;
    }
    getTransactionId(): number {
        return this.tran_id;
    }

    setDescription(des): void {
        this.descripttion = des;
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

    getDateTime(): string {
        return this.dataTime;
    }
}
