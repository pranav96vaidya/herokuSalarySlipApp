import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() heading: string;
  @Input() backBtn: boolean;
  @Input() sendMailBtnObj: any;
  @Input() printBtnObj: any;
  @Input() deleteBtnObj: any;
  @Input() shouldBeLeft: boolean;
  @Output() backBtnClickEvent = new EventEmitter();
  @Output() printBtnClickEvent = new EventEmitter();
  @Output() sendBtnClickEvent = new EventEmitter();
  @Output() deleteBtnClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  backBtnAction() {
    this.backBtnClickEvent.emit();
  }

  printBtnAction() {
    this.printBtnClickEvent.emit();
  }

  sendMailAction() {
    this.sendBtnClickEvent.emit();
  }

  deleteBtnAction() {
    this.deleteBtnClickEvent.emit();
  }
}
