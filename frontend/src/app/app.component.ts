import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';

import { FormControl } from '@angular/forms';
import moment from 'moment';
import 'moment/locale/es';
import { TownService } from './core/services/town.service';
import { PredictionService } from './core/services/prediction.service';
import { Town } from './core/models/Town.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Prediction } from './core/models/Prediction.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  #date: moment.Moment;

  temperatureUnit: FormControl;

  town: FormControl;

  options: Town[] = [];

  townCode: string = '';

  loading: boolean = false;

  prediction: Prediction | undefined = undefined;

  #destroy: Subject<void> = new Subject<void>();

  constructor(private _townService: TownService, private _predictionService: PredictionService) {
    this.#date = moment();

    this.town = new FormControl('');
    this.temperatureUnit = new FormControl('G_CEL');
  }

  ngOnInit() {
    this.town.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._townService.getTown(value)),
      takeUntil(this.#destroy)
    ).subscribe({
      next: (towns) => {
        this.options = towns;
      },
      error: (err) => {
        this.options = [];
        console.error(err);
      }
    });

    this.town.setValue('');
  }

  ngOnDestroy() {
    this.#destroy.next();
    this.#destroy.complete();
  }

  selectOption(optionName: string) {    
    const currentTown = this.options.find(town => town.name === optionName);
    
    if(currentTown) {
      this.townCode = currentTown.code;
      this.getPrediction();
    }
  }

  getPrediction() {
    console.log(this.townCode);
    console.log(this.temperatureUnit.value);

    if (this.townCode && this.temperatureUnit.value) {
      this.loading = true;
      this.prediction = undefined;

      this._predictionService
        .getPrediction(this.townCode, this.temperatureUnit.value)
        .subscribe({
          next: (prediction) => {
            this.prediction = prediction;
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  get formattedDate() {
    return this.#date.format('dddd D [de] MMMM [de] YYYY');
  }

  get month() {
    const m = this.#date.format('MMMM');
    return m.charAt(0).toUpperCase() + m.slice(1);
  }

  get symbol() {
    return this.temperatureUnit.value === 'G_CEL' ? '°C' : '°F';
  }
}
