import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  results: string[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {}

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe((data) => console.log(data));
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    });
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
