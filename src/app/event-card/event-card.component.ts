import {Component, Input, Output} from '@angular/core';
import {AppEvent, EventService} from "../event.service";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import EventEmitter from "node:events";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: AppEvent;
  // Emit the deleted event ID
  // @ts-ignore
  @Output() deleted = new EventEmitter<number>();

  constructor(
    private router: Router,
    private eventService: EventService,
    public authService: AuthService
  ) {}

  onEdit(event: AppEvent) {
    this.router.navigate(['/edit-event', event.idevent]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        alert('Event deleted!');
        // @ts-ignore
        this.deleted.emit(id); // Notify parent to remove this event

      });
    }
  }

}
