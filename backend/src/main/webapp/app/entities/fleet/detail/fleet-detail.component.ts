import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFleet } from '../fleet.model';

@Component({
  selector: 'jhi-fleet-detail',
  templateUrl: './fleet-detail.component.html',
})
export class FleetDetailComponent implements OnInit {
  fleet: IFleet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fleet }) => {
      this.fleet = fleet;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
