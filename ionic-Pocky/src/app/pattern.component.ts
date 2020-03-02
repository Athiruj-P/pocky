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
        return this.databaseService.add_new_user(json);
    }
}

export class currency {
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