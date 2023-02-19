import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { Person } from "../person.model";
import { MessdienerService } from '../services/messdiener.service';

@Component({
  selector: 'app-messdiener-detail',
  templateUrl: './messdiener-detail.component.html',
  styleUrls: ['./messdiener-detail.component.scss']
})
export class MessdienerDetailComponent implements OnInit {
  messdiener: Person = new Person(null,"","","","","",true,1,"");
  messageText: String = "";

  constructor(
    private route: ActivatedRoute,
    private messdienerService: MessdienerService,
    private location: Location, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMessdiener();
  }

  getMessdiener(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!, 10);
    
    if(id) {
      this.messdienerService.getMessdiener(id)
      .subscribe(messdiener => this.gotMessdiener(messdiener));
    }
  }

  gotMessdiener(messdiener:Person): void {
    this.messdiener = messdiener;
  }

  goBack(): void {
    this.router.navigate(["/uebersicht"]);
  }

  showMessage(text: String): void {
    this.messageText = text;
  }

  saved(answer: any): void {
    if(answer && answer.iid)
    {
      this.router.navigate(["/detail/" + answer.iid]);
    }
  }
  
  save(): void {
    const response = this.messdienerService.update(this.messdiener);

    if(response)
    {
      response.subscribe(answer => this.saved(answer));
    }
  }

  deleted(): void {
    this.goBack();
  }

  delete(): void {
    const shouldDelete = window.confirm("Soll die Person wirklich gelöscht werden? Das kann nicht rückgängig gemacht werden..");

    if(shouldDelete)
    {
      const response = this.messdienerService.delete(this.messdiener);
      if(response)
      {
        response.subscribe(answer => this.deleted());
      }
    } 
  }
}
