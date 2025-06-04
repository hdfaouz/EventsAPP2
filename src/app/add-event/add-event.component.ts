import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../event.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventForm: FormGroup;
  isEditMode = false;
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],          // expects 'yyyy-MM-dd' string
      location: ['', Validators.required],
      category: ['', Validators.required],
      availableSeats: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.eventId = +idParam;
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(id: number) {
    this.eventService.getEventById(id).subscribe((event: { eventname: any; description: any;  }) => {
      this.eventForm.patchValue({
        eventname: event.eventname,
        description: event.description,

      });
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) return;

    const formData = this.eventForm.value;

    if (this.isEditMode) {
      this.eventService.updateEvent(this.eventId, formData).subscribe(() => {
        alert('Event updated successfully!');
        this.router.navigate(['/events']);
      });
    } else {
      this.eventService.addEvent(formData).subscribe(() => {
        alert('Event added successfully!');
        this.router.navigate(['/events']);
      });
    }
  }

}
