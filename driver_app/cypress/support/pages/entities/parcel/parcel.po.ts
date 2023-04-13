import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class ParcelComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-parcel';
}

export class ParcelUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-parcel-update';

  setSender_nameInput(sender_name: string) {
    this.setInputValue('sender_name', sender_name);
  }

  setSender_emailInput(sender_email: string) {
    this.setInputValue('sender_email', sender_email);
  }

  setSender_addressInput(sender_address: string) {
    this.setInputValue('sender_address', sender_address);
  }

  setSender_phone_noInput(sender_phone_no: string) {
    this.setInputValue('sender_phone_no', sender_phone_no);
  }

  setReceiver_nameInput(receiver_name: string) {
    this.setInputValue('receiver_name', receiver_name);
  }

  setReceiver_emailInput(receiver_email: string) {
    this.setInputValue('receiver_email', receiver_email);
  }

  setReceiver_addressInput(receiver_address: string) {
    this.setInputValue('receiver_address', receiver_address);
  }

  setReceiver_phone_noInput(receiver_phone_no: string) {
    this.setInputValue('receiver_phone_no', receiver_phone_no);
  }

  setParcel_nameInput(parcel_name: string) {
    this.setInputValue('parcel_name', parcel_name);
  }

  setParcel_typeInput(parcel_type: string) {
    this.setInputValue('parcel_type', parcel_type);
  }

  setParcel_weight_in_kgInput(parcel_weight_in_kg: string) {
    this.setInputValue('parcel_weight_in_kg', parcel_weight_in_kg);
  }

  setStatusInput(status: string) {
    this.setInputValue('status', status);
  }
}

export class ParcelDetailPage extends EntityDetailPage {
  pageSelector = 'page-parcel-detail';

  getSender_nameContent() {
    return cy.get('#sender_name-content');
  }

  getSender_emailContent() {
    return cy.get('#sender_email-content');
  }

  getSender_addressContent() {
    return cy.get('#sender_address-content');
  }

  getSender_phone_noContent() {
    return cy.get('#sender_phone_no-content');
  }

  getReceiver_nameContent() {
    return cy.get('#receiver_name-content');
  }

  getReceiver_emailContent() {
    return cy.get('#receiver_email-content');
  }

  getReceiver_addressContent() {
    return cy.get('#receiver_address-content');
  }

  getReceiver_phone_noContent() {
    return cy.get('#receiver_phone_no-content');
  }

  getParcel_nameContent() {
    return cy.get('#parcel_name-content');
  }

  getParcel_typeContent() {
    return cy.get('#parcel_type-content');
  }

  getParcel_weight_in_kgContent() {
    return cy.get('#parcel_weight_in_kg-content');
  }

  getStatusContent() {
    return cy.get('#status-content');
  }
}
