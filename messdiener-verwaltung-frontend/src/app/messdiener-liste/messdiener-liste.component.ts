import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { Person } from '../person.model';
import { MessdienerService } from "../services/messdiener.service";

@Component({
  selector: 'app-messdiener-liste',
  templateUrl: './messdiener-liste.component.html',
  styleUrls: ['./messdiener-liste.component.scss']
})
export class MessdienerListeComponent implements OnInit {
  messdiener: Person[] = [];
  emails: string = "";

  constructor(private messdienerService: MessdienerService, 
              private clipboard: Clipboard) { }

  getAllMessdiener() :void {
    this.messdienerService.getAllMessdiener().subscribe(messdiener => this.messdiener = messdiener);
  }

  ngOnInit(): void {
    this.getAllMessdiener();
  }

  copyAllActiveEmails(): void {
    this.emails = "";
    const messdiener = this.messdiener;
    
    messdiener.map(messdiener => messdiener.aktiv && messdiener.email ? this.emails += messdiener.email + ";" : null);
    
    this.clipboard.copy(this.emails);
  }

  copyAllEmails(): void {
    this.emails = "";
    const messdiener = this.messdiener;
    
    messdiener.map(messdiener => messdiener.email ? this.emails += messdiener.email + ";" : null);
    
    this.clipboard.copy(this.emails);
  }
}
