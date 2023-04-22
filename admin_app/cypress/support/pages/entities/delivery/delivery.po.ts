import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class DeliveryComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-delivery';
}

export class DeliveryUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-delivery-update';

  setParcel_idInput(parcel_id: string) {
    this.setInputValue('parcel_id', parcel_id);
  }

  setDriver_idInput(driver_id: string) {
    this.setInputValue('driver_id', driver_id);
  }

  setRequest_timeInput(request_time: string) {
    this.setDateTime('request_time', request_time);
  }

  setAssigned_timeInput(assigned_time: string) {
    this.setDateTime('assigned_time', assigned_time);
  }

  setEstimated_timeInput(estimated_time: string) {
    this.setDateTime('estimated_time', estimated_time);
  }

  setEnded_timeInput(ended_time: string) {
    this.setDateTime('ended_time', ended_time);
  }

  setStar_receivedInput(star_received: string) {
    this.setInputValue('star_received', star_received);
  }
}

export class DeliveryDetailPage extends EntityDetailPage {
  pageSelector = 'page-delivery-detail';

  getParcel_idContent() {
    return cy.get('#parcel_id-content');
  }

  getDriver_idContent() {
    return cy.get('#driver_id-content');
  }

  getRequest_timeContent() {
    return cy.get('#request_time-content');
  }

  getAssigned_timeContent() {
    return cy.get('#assigned_time-content');
  }

  getEstimated_timeContent() {
    return cy.get('#estimated_time-content');
  }

  getEnded_timeContent() {
    return cy.get('#ended_time-content');
  }

  getStar_receivedContent() {
    return cy.get('#star_received-content');
  }
}
