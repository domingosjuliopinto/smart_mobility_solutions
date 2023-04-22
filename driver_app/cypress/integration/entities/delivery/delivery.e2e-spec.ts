import { USER_USERNAME, USER_PASSWORD } from '../../../support/config';
import { DeliveryComponentsPage, DeliveryDetailPage, DeliveryUpdatePage } from '../../../support/pages/entities/delivery/delivery.po';
import deliverySample from './delivery.json';

describe('Delivery entity', () => {
  const COMPONENT_TITLE = 'Deliveries';
  const SUBCOMPONENT_TITLE = 'Delivery';

  const deliveryPageUrl = '/tabs/entities/delivery';
  const deliveryApiUrl = '/api/deliveries';

  const deliveryComponentsPage = new DeliveryComponentsPage();
  const deliveryUpdatePage = new DeliveryUpdatePage();
  const deliveryDetailPage = new DeliveryDetailPage();

  let delivery: any;

  beforeEach(() => {
    delivery = undefined;
    cy.login(USER_USERNAME, USER_PASSWORD);
  });

  describe('navigation test', () => {
    it('should load Deliveries page using menu and go back', () => {
      cy.visit('/tabs/home');
      // go to entity component page
      cy.get('ion-tab-button[tab="entities"]').click();
      cy.get('ion-item h2').contains(SUBCOMPONENT_TITLE).first().click();

      deliveryComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE).should('be.visible');
      cy.url().should('include', deliveryPageUrl);

      deliveryComponentsPage.back();
      cy.url().should('include', '/tabs/entities');
    });

    it('should load create Delivery page and go back', () => {
      cy.visit(deliveryPageUrl);
      deliveryComponentsPage.clickOnCreateButton();

      deliveryUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);

      deliveryUpdatePage.back();
      cy.url().should('include', deliveryPageUrl);
    });
  });

  describe('navigation test with items', () => {
    beforeEach(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: deliveryApiUrl,
        body: deliverySample,
      }).then(({ body }) => {
        delivery = body;

        cy.intercept(
          {
            method: 'GET',
            url: `${deliveryApiUrl}+(?*|)`,
            times: 1,
          },
          {
            statusCode: 200,
            body: [delivery],
          }
        ).as('entitiesRequestInternal');
      });
    });

    afterEach(() => {
      if (delivery) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${deliveryApiUrl}/${delivery.id}`,
        }).then(() => {
          delivery = undefined;
        });
      }
    });

    it('should open Delivery view, open Delivery edit and go back', () => {
      cy.visit(deliveryPageUrl);
      deliveryComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      deliveryDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      if (delivery.parcel_id !== undefined && delivery.parcel_id !== null) {
        deliveryDetailPage.getParcel_idContent().contains(delivery.parcel_id);
      }
      if (delivery.driver_id !== undefined && delivery.driver_id !== null) {
        deliveryDetailPage.getDriver_idContent().contains(delivery.driver_id);
      }
      if (delivery.star_received !== undefined && delivery.star_received !== null) {
        deliveryDetailPage.getStar_receivedContent().contains(delivery.star_received);
      }
      deliveryDetailPage.edit();

      deliveryUpdatePage.back();
      deliveryDetailPage.back();
      cy.url().should('include', deliveryPageUrl);
    });

    it('should open Delivery view, open Delivery edit and save', () => {
      cy.visit(deliveryPageUrl);
      deliveryComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      deliveryDetailPage.getPageTitle().contains(SUBCOMPONENT_TITLE).should('be.visible');
      deliveryDetailPage.edit();

      deliveryUpdatePage.save();
      cy.url().should('include', deliveryPageUrl);
    });

    it('should delete Delivery', () => {
      cy.visit(deliveryPageUrl);
      deliveryComponentsPage.getPageTitle().should('be.visible');

      cy.wait('@entitiesRequestInternal');
      cy.get('ion-item').last().click();

      deliveryDetailPage.delete();
      cy.get('ion-alert button:not(.alert-button-role-cancel)').click();

      deliveryComponentsPage.getPageTitle().should('have.text', COMPONENT_TITLE);
      delivery = undefined;
    });
  });

  describe('creation test', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: deliveryApiUrl,
        times: 1,
      }).as('entitiesPost');
    });

    afterEach(() => {
      if (delivery) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `${deliveryApiUrl}/${delivery.id}`,
        }).then(() => {
          delivery = undefined;
        });
      }
    });

    it('should create Delivery', () => {
      cy.visit(deliveryPageUrl + '/new');

      deliveryUpdatePage.getPageTitle().should('have.text', SUBCOMPONENT_TITLE);
      if (deliverySample.parcel_id !== undefined && deliverySample.parcel_id !== null) {
        deliveryUpdatePage.setParcel_idInput(deliverySample.parcel_id);
      }
      if (deliverySample.driver_id !== undefined && deliverySample.driver_id !== null) {
        deliveryUpdatePage.setDriver_idInput(deliverySample.driver_id);
      }
      if (deliverySample.request_time !== undefined && deliverySample.request_time !== null) {
        deliveryUpdatePage.setRequest_timeInput(deliverySample.request_time);
      }
      if (deliverySample.assigned_time !== undefined && deliverySample.assigned_time !== null) {
        deliveryUpdatePage.setAssigned_timeInput(deliverySample.assigned_time);
      }
      if (deliverySample.estimated_time !== undefined && deliverySample.estimated_time !== null) {
        deliveryUpdatePage.setEstimated_timeInput(deliverySample.estimated_time);
      }
      if (deliverySample.ended_time !== undefined && deliverySample.ended_time !== null) {
        deliveryUpdatePage.setEnded_timeInput(deliverySample.ended_time);
      }
      if (deliverySample.star_received !== undefined && deliverySample.star_received !== null) {
        deliveryUpdatePage.setStar_receivedInput(deliverySample.star_received);
      }
      deliveryUpdatePage.save();

      cy.wait('@entitiesPost').then(({ response }) => {
        const { body } = response;
        delivery = body;
      });

      deliveryComponentsPage.getPageTitle().contains(COMPONENT_TITLE);
    });
  });
});
