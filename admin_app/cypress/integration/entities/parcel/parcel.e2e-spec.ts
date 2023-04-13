import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import { ParcelComponentsPage, ParcelDetailPage, ParcelUpdatePage } from '../../../support/pages/entities/parcel/parcel.po';
import parcelSample from './parcel.json';

describe('Parcel entity', () => {
  const COMPONENT_TITLE = 'Parcels';
  const SUBCOMPONENT_TITLE = 'Parcel';

  const parcelPageUrl = '/tabs/entities/parcel';
  const parcelApiUrl = '/api/parcels';

  const parcelComponentsPage = new ParcelComponentsPage();
  const parcelUpdatePage = new ParcelUpdatePage();
  const parcelDetailPage = new ParcelDetailPage();

  let parcel: any;

  beforeEach(() => {
    parcel = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load Parcels page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      parcelComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', parcelPageUrl);

      parcelComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create Parcel page and go back', () => {
      cy.visit(parcelPageUrl);
      parcelComponentsPage.clickOnCreateButton();

      parcelUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      parcelUpdatePage.back();
      cy.url().should('include', parcelPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: parcelApiUrl,
        body: parcelSample,
      }).then(({ body }) => {
        parcel = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${parcelApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [parcel],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (parcel) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${parcelApiUrl}/${parcel.id}`,
        }).then(() => {
          parcel = undefined;
        });
      }
    });

    it('should open Parcel view, open Parcel edit and go back', () => {
      cy.visit(parcelPageUrl);
      parcelComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      parcelDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (parcel.sender_name !== undefined && parcel.sender_name !== null) {
        parcelDetailPage.getSender_nameContent().contains(parcel.sender_name);
      }
      if (parcel.sender_email !== undefined && parcel.sender_email !== null) {
        parcelDetailPage.getSender_emailContent().contains(parcel.sender_email);
      }
      if (parcel.sender_address !== undefined && parcel.sender_address !== null) {
        parcelDetailPage.getSender_addressContent().contains(parcel.sender_address);
      }
      if (parcel.sender_phone_no !== undefined && parcel.sender_phone_no !== null) {
        parcelDetailPage.getSender_phone_noContent().contains(parcel.sender_phone_no);
      }
      if (parcel.receiver_name !== undefined && parcel.receiver_name !== null) {
        parcelDetailPage.getReceiver_nameContent().contains(parcel.receiver_name);
      }
      if (parcel.receiver_email !== undefined && parcel.receiver_email !== null) {
        parcelDetailPage.getReceiver_emailContent().contains(parcel.receiver_email);
      }
      if (parcel.receiver_address !== undefined && parcel.receiver_address !== null) {
        parcelDetailPage.getReceiver_addressContent().contains(parcel.receiver_address);
      }
      if (parcel.receiver_phone_no !== undefined && parcel.receiver_phone_no !== null) {
        parcelDetailPage.getReceiver_phone_noContent().contains(parcel.receiver_phone_no);
      }
      if (parcel.parcel_name !== undefined && parcel.parcel_name !== null) {
        parcelDetailPage.getParcel_nameContent().contains(parcel.parcel_name);
      }
      if (parcel.parcel_type !== undefined && parcel.parcel_type !== null) {
        parcelDetailPage.getParcel_typeContent().contains(parcel.parcel_type);
      }
      if (parcel.parcel_weight_in_kg !== undefined && parcel.parcel_weight_in_kg !== null) {
        parcelDetailPage.getParcel_weight_in_kgContent().contains(parcel.parcel_weight_in_kg);
      }
      if (parcel.status !== undefined && parcel.status !== null) {
        parcelDetailPage.getStatusContent().contains(parcel.status);
      }
      parcelDetailPage.edit();

      parcelUpdatePage.back();
      parcelDetailPage.back();
      cy.url().should('include', parcelPageUrl);
    });

    it('should open Parcel view, open Parcel edit and save', () => {
      cy.visit(parcelPageUrl);
      parcelComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      parcelDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      parcelDetailPage.edit();

      parcelUpdatePage.save();
      cy.url().should('include', parcelPageUrl);
    });

    it('should delete Parcel', () => {
      cy.visit(parcelPageUrl);
      parcelComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      parcelDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      parcelComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      parcel = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: parcelApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (parcel) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${parcelApiUrl}/${parcel.id}`,
        }).then(() => {
          parcel = undefined;
        });
      }
    });

    it('should create Parcel', () => {
      cy.visit(parcelPageUrl + '/new');

      parcelUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (parcelSample.sender_name !== undefined && parcelSample.sender_name !== null) {
        parcelUpdatePage.setSender_nameInput(parcelSample.sender_name);
      }
      if (parcelSample.sender_email !== undefined && parcelSample.sender_email !== null) {
        parcelUpdatePage.setSender_emailInput(parcelSample.sender_email);
      }
      if (parcelSample.sender_address !== undefined && parcelSample.sender_address !== null) {
        parcelUpdatePage.setSender_addressInput(parcelSample.sender_address);
      }
      if (parcelSample.sender_phone_no !== undefined && parcelSample.sender_phone_no !== null) {
        parcelUpdatePage.setSender_phone_noInput(parcelSample.sender_phone_no);
      }
      if (parcelSample.receiver_name !== undefined && parcelSample.receiver_name !== null) {
        parcelUpdatePage.setReceiver_nameInput(parcelSample.receiver_name);
      }
      if (parcelSample.receiver_email !== undefined && parcelSample.receiver_email !== null) {
        parcelUpdatePage.setReceiver_emailInput(parcelSample.receiver_email);
      }
      if (parcelSample.receiver_address !== undefined && parcelSample.receiver_address !== null) {
        parcelUpdatePage.setReceiver_addressInput(parcelSample.receiver_address);
      }
      if (parcelSample.receiver_phone_no !== undefined && parcelSample.receiver_phone_no !== null) {
        parcelUpdatePage.setReceiver_phone_noInput(parcelSample.receiver_phone_no);
      }
      if (parcelSample.parcel_name !== undefined && parcelSample.parcel_name !== null) {
        parcelUpdatePage.setParcel_nameInput(parcelSample.parcel_name);
      }
      if (parcelSample.parcel_type !== undefined && parcelSample.parcel_type !== null) {
        parcelUpdatePage.setParcel_typeInput(parcelSample.parcel_type);
      }
      if (parcelSample.parcel_weight_in_kg !== undefined && parcelSample.parcel_weight_in_kg !== null) {
        parcelUpdatePage.setParcel_weight_in_kgInput(parcelSample.parcel_weight_in_kg);
      }
      if (parcelSample.status !== undefined && parcelSample.status !== null) {
        parcelUpdatePage.setStatusInput(parcelSample.status);
      }
      parcelUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        parcel = body;
      });

      parcelComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
