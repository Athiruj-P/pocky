import { DatabaseService } from 'src/app/services/database.service';

export class Account {
    private username: string;
    private password: string;
    public databaseService: DatabaseService;
    public check:boolean;
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
        // var check: boolean;

        // this.databaseService.login_varification(json).subscribe(res => {
        //     // check = Object.keys(res).length > 0 ? true : false;
        //     console.log(`res => ${res}`);

        //     this.check = Object.keys(res).length > 0 ? true : false;
        // });

        return this.databaseService.login_varification(json);
    }

    reginter() {
        // 
    }
}