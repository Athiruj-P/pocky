import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  gotoPage(page) {
    this.router.navigate([page], {});
  }

  backPage(){
    this.navCtrl.back();
  }

}
