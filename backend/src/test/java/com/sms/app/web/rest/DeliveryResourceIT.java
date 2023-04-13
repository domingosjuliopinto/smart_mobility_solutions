package com.sms.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sms.app.IntegrationTest;
import com.sms.app.domain.Delivery;
import com.sms.app.repository.DeliveryRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DeliveryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeliveryResourceIT {

    private static final Integer DEFAULT_PARCEL_ID = 1;
    private static final Integer UPDATED_PARCEL_ID = 2;

    private static final Integer DEFAULT_DRIVER_ID = 1;
    private static final Integer UPDATED_DRIVER_ID = 2;

    private static final Instant DEFAULT_REQUEST_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REQUEST_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ASSIGNED_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ASSIGNED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ESTIMATED_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ESTIMATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ENDED_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENDED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_STAR_RECEIVED = 0;
    private static final Integer UPDATED_STAR_RECEIVED = 1;

    private static final String DEFAULT_DELIVERY_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/deliveries";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .parcel_id(DEFAULT_PARCEL_ID)
            .driver_id(DEFAULT_DRIVER_ID)
            .request_time(DEFAULT_REQUEST_TIME)
            .assigned_time(DEFAULT_ASSIGNED_TIME)
            .estimated_time(DEFAULT_ESTIMATED_TIME)
            .ended_time(DEFAULT_ENDED_TIME)
            .star_received(DEFAULT_STAR_RECEIVED)
            .delivery_status(DEFAULT_DELIVERY_STATUS);
        return delivery;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createUpdatedEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .parcel_id(UPDATED_PARCEL_ID)
            .driver_id(UPDATED_DRIVER_ID)
            .request_time(UPDATED_REQUEST_TIME)
            .assigned_time(UPDATED_ASSIGNED_TIME)
            .estimated_time(UPDATED_ESTIMATED_TIME)
            .ended_time(UPDATED_ENDED_TIME)
            .star_received(UPDATED_STAR_RECEIVED)
            .delivery_status(UPDATED_DELIVERY_STATUS);
        return delivery;
    }

    @BeforeEach
    public void initTest() {
        delivery = createEntity(em);
    }

    @Test
    @Transactional
    void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();
        // Create the Delivery
        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getParcel_id()).isEqualTo(DEFAULT_PARCEL_ID);
        assertThat(testDelivery.getDriver_id()).isEqualTo(DEFAULT_DRIVER_ID);
        assertThat(testDelivery.getRequest_time()).isEqualTo(DEFAULT_REQUEST_TIME);
        assertThat(testDelivery.getAssigned_time()).isEqualTo(DEFAULT_ASSIGNED_TIME);
        assertThat(testDelivery.getEstimated_time()).isEqualTo(DEFAULT_ESTIMATED_TIME);
        assertThat(testDelivery.getEnded_time()).isEqualTo(DEFAULT_ENDED_TIME);
        assertThat(testDelivery.getStar_received()).isEqualTo(DEFAULT_STAR_RECEIVED);
        assertThat(testDelivery.getDelivery_status()).isEqualTo(DEFAULT_DELIVERY_STATUS);
    }

    @Test
    @Transactional
    void createDeliveryWithExistingId() throws Exception {
        // Create the Delivery with an existing ID
        delivery.setId(1L);

        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParcel_idIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setParcel_id(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkRequest_timeIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setRequest_time(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDelivery_statusIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setDelivery_status(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].parcel_id").value(hasItem(DEFAULT_PARCEL_ID)))
            .andExpect(jsonPath("$.[*].driver_id").value(hasItem(DEFAULT_DRIVER_ID)))
            .andExpect(jsonPath("$.[*].request_time").value(hasItem(DEFAULT_REQUEST_TIME.toString())))
            .andExpect(jsonPath("$.[*].assigned_time").value(hasItem(DEFAULT_ASSIGNED_TIME.toString())))
            .andExpect(jsonPath("$.[*].estimated_time").value(hasItem(DEFAULT_ESTIMATED_TIME.toString())))
            .andExpect(jsonPath("$.[*].ended_time").value(hasItem(DEFAULT_ENDED_TIME.toString())))
            .andExpect(jsonPath("$.[*].star_received").value(hasItem(DEFAULT_STAR_RECEIVED)))
            .andExpect(jsonPath("$.[*].delivery_status").value(hasItem(DEFAULT_DELIVERY_STATUS)));
    }

    @Test
    @Transactional
    void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get the delivery
        restDeliveryMockMvc
            .perform(get(ENTITY_API_URL_ID, delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId().intValue()))
            .andExpect(jsonPath("$.parcel_id").value(DEFAULT_PARCEL_ID))
            .andExpect(jsonPath("$.driver_id").value(DEFAULT_DRIVER_ID))
            .andExpect(jsonPath("$.request_time").value(DEFAULT_REQUEST_TIME.toString()))
            .andExpect(jsonPath("$.assigned_time").value(DEFAULT_ASSIGNED_TIME.toString()))
            .andExpect(jsonPath("$.estimated_time").value(DEFAULT_ESTIMATED_TIME.toString()))
            .andExpect(jsonPath("$.ended_time").value(DEFAULT_ENDED_TIME.toString()))
            .andExpect(jsonPath("$.star_received").value(DEFAULT_STAR_RECEIVED))
            .andExpect(jsonPath("$.delivery_status").value(DEFAULT_DELIVERY_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findById(delivery.getId()).get();
        // Disconnect from session so that the updates on updatedDelivery are not directly saved in db
        em.detach(updatedDelivery);
        updatedDelivery
            .parcel_id(UPDATED_PARCEL_ID)
            .driver_id(UPDATED_DRIVER_ID)
            .request_time(UPDATED_REQUEST_TIME)
            .assigned_time(UPDATED_ASSIGNED_TIME)
            .estimated_time(UPDATED_ESTIMATED_TIME)
            .ended_time(UPDATED_ENDED_TIME)
            .star_received(UPDATED_STAR_RECEIVED)
            .delivery_status(UPDATED_DELIVERY_STATUS);

        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDelivery.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getParcel_id()).isEqualTo(UPDATED_PARCEL_ID);
        assertThat(testDelivery.getDriver_id()).isEqualTo(UPDATED_DRIVER_ID);
        assertThat(testDelivery.getRequest_time()).isEqualTo(UPDATED_REQUEST_TIME);
        assertThat(testDelivery.getAssigned_time()).isEqualTo(UPDATED_ASSIGNED_TIME);
        assertThat(testDelivery.getEstimated_time()).isEqualTo(UPDATED_ESTIMATED_TIME);
        assertThat(testDelivery.getEnded_time()).isEqualTo(UPDATED_ENDED_TIME);
        assertThat(testDelivery.getStar_received()).isEqualTo(UPDATED_STAR_RECEIVED);
        assertThat(testDelivery.getDelivery_status()).isEqualTo(UPDATED_DELIVERY_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, delivery.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDeliveryWithPatch() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery using partial update
        Delivery partialUpdatedDelivery = new Delivery();
        partialUpdatedDelivery.setId(delivery.getId());

        partialUpdatedDelivery
            .parcel_id(UPDATED_PARCEL_ID)
            .assigned_time(UPDATED_ASSIGNED_TIME)
            .estimated_time(UPDATED_ESTIMATED_TIME)
            .ended_time(UPDATED_ENDED_TIME)
            .star_received(UPDATED_STAR_RECEIVED);

        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDelivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getParcel_id()).isEqualTo(UPDATED_PARCEL_ID);
        assertThat(testDelivery.getDriver_id()).isEqualTo(DEFAULT_DRIVER_ID);
        assertThat(testDelivery.getRequest_time()).isEqualTo(DEFAULT_REQUEST_TIME);
        assertThat(testDelivery.getAssigned_time()).isEqualTo(UPDATED_ASSIGNED_TIME);
        assertThat(testDelivery.getEstimated_time()).isEqualTo(UPDATED_ESTIMATED_TIME);
        assertThat(testDelivery.getEnded_time()).isEqualTo(UPDATED_ENDED_TIME);
        assertThat(testDelivery.getStar_received()).isEqualTo(UPDATED_STAR_RECEIVED);
        assertThat(testDelivery.getDelivery_status()).isEqualTo(DEFAULT_DELIVERY_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateDeliveryWithPatch() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery using partial update
        Delivery partialUpdatedDelivery = new Delivery();
        partialUpdatedDelivery.setId(delivery.getId());

        partialUpdatedDelivery
            .parcel_id(UPDATED_PARCEL_ID)
            .driver_id(UPDATED_DRIVER_ID)
            .request_time(UPDATED_REQUEST_TIME)
            .assigned_time(UPDATED_ASSIGNED_TIME)
            .estimated_time(UPDATED_ESTIMATED_TIME)
            .ended_time(UPDATED_ENDED_TIME)
            .star_received(UPDATED_STAR_RECEIVED)
            .delivery_status(UPDATED_DELIVERY_STATUS);

        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDelivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getParcel_id()).isEqualTo(UPDATED_PARCEL_ID);
        assertThat(testDelivery.getDriver_id()).isEqualTo(UPDATED_DRIVER_ID);
        assertThat(testDelivery.getRequest_time()).isEqualTo(UPDATED_REQUEST_TIME);
        assertThat(testDelivery.getAssigned_time()).isEqualTo(UPDATED_ASSIGNED_TIME);
        assertThat(testDelivery.getEstimated_time()).isEqualTo(UPDATED_ESTIMATED_TIME);
        assertThat(testDelivery.getEnded_time()).isEqualTo(UPDATED_ENDED_TIME);
        assertThat(testDelivery.getStar_received()).isEqualTo(UPDATED_STAR_RECEIVED);
        assertThat(testDelivery.getDelivery_status()).isEqualTo(UPDATED_DELIVERY_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, delivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Delete the delivery
        restDeliveryMockMvc
            .perform(delete(ENTITY_API_URL_ID, delivery.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
