import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FleetFormService, FleetFormGroup } from './fleet-form.service';
import { IFleet } from '../fleet.model';
import { FleetService } from '../service/fleet.service';

@Component({
  selector: 'jhi-fleet-update',
  templateUrl: './fleet-update.component.html',
})
export class FleetUpdateComponent implements OnInit {
  isSaving = false;
  fleet: IFleet | null = null;

  editForm: FleetFormGroup = this.fleetFormService.createFleetFormGroup();

  constructor(
    protected fleetService: FleetService,
    protected fleetFormService: FleetFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fleet }) => {
      this.fleet = fleet;
      if (fleet) {
        this.updateForm(fleet);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fleet = this.fleetFormService.getFleet(this.editForm);
    if (fleet.id !== null) {
      this.subscribeToSaveResponse(this.fleetService.update(fleet));
    } else {
      this.subscribeToSaveResponse(this.fleetService.create(fleet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFleet>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fleet: IFleet): void {
    this.fleet = fleet;
    this.fleetFormService.resetForm(this.editForm, fleet);
  }
}
