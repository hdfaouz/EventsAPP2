import {Component, OnInit} from '@angular/core';
import {AppEvent, EventService} from "../event.service";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{
  events: AppEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      console.log("data", data);
    });
  }

  onEventDeleted(deletedId: number) {
    this.events = this.events.filter(event => event.idevent!== deletedId);
  }
}


