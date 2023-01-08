import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

import { Person } from "../person.model";
import { MessdienerService } from '../services/messdiener.service';

@Component({
  selector: 'app-messdiener-detail',
  templateUrl: './messdiener-detail.component.html',
  styleUrls: ['./messdiener-detail.component.scss']
})
export class MessdienerDetailComponent implements OnInit {
  messdiener: Person | undefined;
  messageText: String = "";

  constructor(
    private route: ActivatedRoute,
    private messdienerService: MessdienerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMessdiener();
  }

  getMessdiener(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!, 10);
    this.messdienerService.getMessdiener(id)
      .subscribe(messdiener => this.gotMessdiener(messdiener))
  }

  gotMessdiener(messdiener:Person): void {
    this.messdiener = messdiener;
    console.info(messdiener);
  }

  goBack(): void {
    this.location.back();
  }

  showMessage(text: String): void {
    this.messageText = text;
  }

  saved(updatedMessdiener: Person): void {
    this.messdiener = updatedMessdiener;
    this.showMessage("Speichern erfolgreich");
  }
  
  save(): void {
    const response = this.messdienerService.update(this.messdiener);
    if(response)
    {
      response.subscribe(answer => this.saved(answer));
    }
      
  }

}
