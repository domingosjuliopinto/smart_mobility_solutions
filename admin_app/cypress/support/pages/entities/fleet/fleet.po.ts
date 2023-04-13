import { EntityComponentsPage, EntityDetailPage, EntityUpdatePage } from '../../entity.po';

export class FleetComponentsPage extends EntityComponentsPage {
  pageSelector = 'page-fleet';
}

export class FleetUpdatePage extends EntityUpdatePage {
  pageSelector = 'page-fleet-update';

  setDriver_nameInput(driver_name: string) {
    this.setInputValue('driver_name', driver_name);
  }

  setDriver_emailInput(driver_email: string) {
    this.setInputValue('driver_email', driver_email);
  }

  setDriver_addressInput(driver_address: string) {
    this.setInputValue('driver_address', driver_address);
  }

  setDriver_phone_noInput(driver_phone_no: string) {
    this.setInputValue('driver_phone_no', driver_phone_no);
  }

  setVehicle_plate_noInput(vehicle_plate_no: string) {
    this.setInputValue('vehicle_plate_no', vehicle_plate_no);
  }

  setVehicle_typeInput(vehicle_type: string) {
    this.setInputValue('vehicle_type', vehicle_type);
  }

  setVehicle_statusInput(vehicle_status: string) {
    this.setInputValue('vehicle_status', vehicle_status);
  }
}

export class FleetDetailPage extends EntityDetailPage {
  pageSelector = 'page-fleet-detail';

  getDriver_nameContent() {
    return cy.get('#driver_name-content');
  }

  getDriver_emailContent() {
    return cy.get('#driver_email-content');
  }

  getDriver_addressContent() {
    return cy.get('#driver_address-content');
  }

  getDriver_phone_noContent() {
    return cy.get('#driver_phone_no-content');
  }

  getVehicle_plate_noContent() {
    return cy.get('#vehicle_plate_no-content');
  }

  getVehicle_typeContent() {
    return cy.get('#vehicle_type-content');
  }

  getVehicle_statusContent() {
    return cy.get('#vehicle_status-content');
  }
}
