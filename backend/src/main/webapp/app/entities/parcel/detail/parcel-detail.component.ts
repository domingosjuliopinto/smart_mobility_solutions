import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParcel } from '../parcel.model';

@Component({
  selector: 'jhi-parcel-detail',
  templateUrl: './parcel-detail.component.html',
})
export class ParcelDetailComponent implements OnInit {
  parcel: IParcel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parcel }) => {
      this.parcel = parcel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
