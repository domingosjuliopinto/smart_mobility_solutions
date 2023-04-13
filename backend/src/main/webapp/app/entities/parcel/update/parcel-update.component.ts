import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ParcelFormService, ParcelFormGroup } from './parcel-form.service';
import { IParcel } from '../parcel.model';
import { ParcelService } from '../service/parcel.service';

@Component({
  selector: 'jhi-parcel-update',
  templateUrl: './parcel-update.component.html',
})
export class ParcelUpdateComponent implements OnInit {
  isSaving = false;
  parcel: IParcel | null = null;

  editForm: ParcelFormGroup = this.parcelFormService.createParcelFormGroup();

  constructor(
    protected parcelService: ParcelService,
    protected parcelFormService: ParcelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parcel }) => {
      this.parcel = parcel;
      if (parcel) {
        this.updateForm(parcel);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parcel = this.parcelFormService.getParcel(this.editForm);
    if (parcel.id !== null) {
      this.subscribeToSaveResponse(this.parcelService.update(parcel));
    } else {
      this.subscribeToSaveResponse(this.parcelService.create(parcel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcel>>): void {
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

  protected updateForm(parcel: IParcel): void {
    this.parcel = parcel;
    this.parcelFormService.resetForm(this.editForm, parcel);
  }
}
