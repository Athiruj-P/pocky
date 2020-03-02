import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.page.html',
  styleUrls: ['./wallet-detail.page.scss'],
})
export class WalletDetailPage implements OnInit {

  private date: string;
  private time: string;
  private note: string;
  private income: any;
  private expense: any;
  private current: string;
  private totalBalance: any;

  private transactions = [];

  constructor() {
    this.transactions.push(
      { date: "18 Jan 2020", time: "12:00 PM", note: "ข้าวเที่ยง" , income: 0, expense: -35.00, current: "THB"},
      { date: "17 Jan 2020", time: "09:00 AM", note: "ข้าวเหนียวหมูปิ้ง" , income: 0, expense: -40.00, current: "THB"},
      { date: "16 Jan 2020", time: "02:00 PM", note: "เติมน้ำมัน" , income: 0, expense: -120.00, current: "THB"},
      { date: "15 Jan 2020", time: "12:00 PM", note: "ข้าวเที่ยง" , income: 0, expense: -40.00, current: "THB"}
    );
    this.getTotalBalance();
   }

  getTotalBalance() {
    this.totalBalance = 0;
    this.transactions.forEach(val => {
      this.totalBalance += val.income - val.expense;
    });
  }

  ngOnInit() {
  }

}
