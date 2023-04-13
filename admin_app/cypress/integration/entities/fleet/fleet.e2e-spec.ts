import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import { FleetComponentsPage, FleetDetailPage, FleetUpdatePage } from '../../../support/pages/entities/fleet/fleet.po';
import fleetSample from './fleet.json';

describe('Fleet entity', () => {
  const COMPONENT_TITLE = 'Fleets';
  const SUBCOMPONENT_TITLE = 'Fleet';

  const fleetPageUrl = '/tabs/entities/fleet';
  const fleetApiUrl = '/api/fleets';

  const fleetComponentsPage = new FleetComponentsPage();
  const fleetUpdatePage = new FleetUpdatePage();
  const fleetDetailPage = new FleetDetailPage();

  let fleet: any;

  beforeEach(() => {
    fleet = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load Fleets page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      fleetComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', fleetPageUrl);

      fleetComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create Fleet page and go back', () => {
      cy.visit(fleetPageUrl);
      fleetComponentsPage.clickOnCreateButton();

      fleetUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      fleetUpdatePage.back();
      cy.url().should('include', fleetPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: fleetApiUrl,
        body: fleetSample,
      }).then(({ body }) => {
        fleet = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${fleetApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [fleet],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (fleet) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${fleetApiUrl}/${fleet.id}`,
        }).then(() => {
          fleet = undefined;
        });
      }
    });

    it('should open Fleet view, open Fleet edit and go back', () => {
      cy.visit(fleetPageUrl);
      fleetComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      fleetDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (fleet.driver_name !== undefined && fleet.driver_name !== null) {
        fleetDetailPage.getDriver_nameContent().contains(fleet.driver_name);
      }
      if (fleet.driver_email !== undefined && fleet.driver_email !== null) {
        fleetDetailPage.getDriver_emailContent().contains(fleet.driver_email);
      }
      if (fleet.driver_address !== undefined && fleet.driver_address !== null) {
        fleetDetailPage.getDriver_addressContent().contains(fleet.driver_address);
      }
      if (fleet.driver_phone_no !== undefined && fleet.driver_phone_no !== null) {
        fleetDetailPage.getDriver_phone_noContent().contains(fleet.driver_phone_no);
      }
      if (fleet.vehicle_plate_no !== undefined && fleet.vehicle_plate_no !== null) {
        fleetDetailPage.getVehicle_plate_noContent().contains(fleet.vehicle_plate_no);
      }
      if (fleet.vehicle_type !== undefined && fleet.vehicle_type !== null) {
        fleetDetailPage.getVehicle_typeContent().contains(fleet.vehicle_type);
      }
      if (fleet.vehicle_status !== undefined && fleet.vehicle_status !== null) {
        fleetDetailPage.getVehicle_statusContent().contains(fleet.vehicle_status);
      }
      fleetDetailPage.edit();

      fleetUpdatePage.back();
      fleetDetailPage.back();
      cy.url().should('include', fleetPageUrl);
    });

    it('should open Fleet view, open Fleet edit and save', () => {
      cy.visit(fleetPageUrl);
      fleetComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      fleetDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      fleetDetailPage.edit();

      fleetUpdatePage.save();
      cy.url().should('include', fleetPageUrl);
    });

    it('should delete Fleet', () => {
      cy.visit(fleetPageUrl);
      fleetComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      fleetDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      fleetComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      fleet = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: fleetApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (fleet) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${fleetApiUrl}/${fleet.id}`,
        }).then(() => {
          fleet = undefined;
        });
      }
    });

    it('should create Fleet', () => {
      cy.visit(fleetPageUrl + '/new');

      fleetUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (fleetSample.driver_name !== undefined && fleetSample.driver_name !== null) {
        fleetUpdatePage.setDriver_nameInput(fleetSample.driver_name);
      }
      if (fleetSample.driver_email !== undefined && fleetSample.driver_email !== null) {
        fleetUpdatePage.setDriver_emailInput(fleetSample.driver_email);
      }
      if (fleetSample.driver_address !== undefined && fleetSample.driver_address !== null) {
        fleetUpdatePage.setDriver_addressInput(fleetSample.driver_address);
      }
      if (fleetSample.driver_phone_no !== undefined && fleetSample.driver_phone_no !== null) {
        fleetUpdatePage.setDriver_phone_noInput(fleetSample.driver_phone_no);
      }
      if (fleetSample.vehicle_plate_no !== undefined && fleetSample.vehicle_plate_no !== null) {
        fleetUpdatePage.setVehicle_plate_noInput(fleetSample.vehicle_plate_no);
      }
      if (fleetSample.vehicle_type !== undefined && fleetSample.vehicle_type !== null) {
        fleetUpdatePage.setVehicle_typeInput(fleetSample.vehicle_type);
      }
      if (fleetSample.vehicle_status !== undefined && fleetSample.vehicle_status !== null) {
        fleetUpdatePage.setVehicle_statusInput(fleetSample.vehicle_status);
      }
      fleetUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        fleet = body;
      });

      fleetComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
