package com.sms.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sms.app.IntegrationTest;
import com.sms.app.domain.Fleet;
import com.sms.app.repository.FleetRepository;
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
 * Integration tests for the {@link FleetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FleetResourceIT {

    private static final String DEFAULT_DRIVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_EMAIL = "N@9I";
    private static final String UPDATED_DRIVER_EMAIL = "kd@P";

    private static final String DEFAULT_DRIVER_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_PHONE_NO = "06639";
    private static final String UPDATED_DRIVER_PHONE_NO = "0955";

    private static final String DEFAULT_VEHICLE_PLATE_NO = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_PLATE_NO = "BBBBBBBBBB";

    private static final String DEFAULT_VEHICLE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_VEHICLE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/fleets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FleetRepository fleetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFleetMockMvc;

    private Fleet fleet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fleet createEntity(EntityManager em) {
        Fleet fleet = new Fleet()
            .driver_name(DEFAULT_DRIVER_NAME)
            .driver_email(DEFAULT_DRIVER_EMAIL)
            .driver_address(DEFAULT_DRIVER_ADDRESS)
            .driver_phone_no(DEFAULT_DRIVER_PHONE_NO)
            .vehicle_plate_no(DEFAULT_VEHICLE_PLATE_NO)
            .vehicle_type(DEFAULT_VEHICLE_TYPE)
            .vehicle_status(DEFAULT_VEHICLE_STATUS);
        return fleet;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fleet createUpdatedEntity(EntityManager em) {
        Fleet fleet = new Fleet()
            .driver_name(UPDATED_DRIVER_NAME)
            .driver_email(UPDATED_DRIVER_EMAIL)
            .driver_address(UPDATED_DRIVER_ADDRESS)
            .driver_phone_no(UPDATED_DRIVER_PHONE_NO)
            .vehicle_plate_no(UPDATED_VEHICLE_PLATE_NO)
            .vehicle_type(UPDATED_VEHICLE_TYPE)
            .vehicle_status(UPDATED_VEHICLE_STATUS);
        return fleet;
    }

    @BeforeEach
    public void initTest() {
        fleet = createEntity(em);
    }

    @Test
    @Transactional
    void createFleet() throws Exception {
        int databaseSizeBeforeCreate = fleetRepository.findAll().size();
        // Create the Fleet
        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isCreated());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeCreate + 1);
        Fleet testFleet = fleetList.get(fleetList.size() - 1);
        assertThat(testFleet.getDriver_name()).isEqualTo(DEFAULT_DRIVER_NAME);
        assertThat(testFleet.getDriver_email()).isEqualTo(DEFAULT_DRIVER_EMAIL);
        assertThat(testFleet.getDriver_address()).isEqualTo(DEFAULT_DRIVER_ADDRESS);
        assertThat(testFleet.getDriver_phone_no()).isEqualTo(DEFAULT_DRIVER_PHONE_NO);
        assertThat(testFleet.getVehicle_plate_no()).isEqualTo(DEFAULT_VEHICLE_PLATE_NO);
        assertThat(testFleet.getVehicle_type()).isEqualTo(DEFAULT_VEHICLE_TYPE);
        assertThat(testFleet.getVehicle_status()).isEqualTo(DEFAULT_VEHICLE_STATUS);
    }

    @Test
    @Transactional
    void createFleetWithExistingId() throws Exception {
        // Create the Fleet with an existing ID
        fleet.setId(1L);

        int databaseSizeBeforeCreate = fleetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDriver_nameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setDriver_name(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDriver_emailIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setDriver_email(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDriver_addressIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setDriver_address(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDriver_phone_noIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setDriver_phone_no(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkVehicle_typeIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setVehicle_type(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkVehicle_statusIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetRepository.findAll().size();
        // set the field null
        fleet.setVehicle_status(null);

        // Create the Fleet, which fails.

        restFleetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isBadRequest());

        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFleets() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        // Get all the fleetList
        restFleetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fleet.getId().intValue())))
            .andExpect(jsonPath("$.[*].driver_name").value(hasItem(DEFAULT_DRIVER_NAME)))
            .andExpect(jsonPath("$.[*].driver_email").value(hasItem(DEFAULT_DRIVER_EMAIL)))
            .andExpect(jsonPath("$.[*].driver_address").value(hasItem(DEFAULT_DRIVER_ADDRESS)))
            .andExpect(jsonPath("$.[*].driver_phone_no").value(hasItem(DEFAULT_DRIVER_PHONE_NO)))
            .andExpect(jsonPath("$.[*].vehicle_plate_no").value(hasItem(DEFAULT_VEHICLE_PLATE_NO)))
            .andExpect(jsonPath("$.[*].vehicle_type").value(hasItem(DEFAULT_VEHICLE_TYPE)))
            .andExpect(jsonPath("$.[*].vehicle_status").value(hasItem(DEFAULT_VEHICLE_STATUS)));
    }

    @Test
    @Transactional
    void getFleet() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        // Get the fleet
        restFleetMockMvc
            .perform(get(ENTITY_API_URL_ID, fleet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fleet.getId().intValue()))
            .andExpect(jsonPath("$.driver_name").value(DEFAULT_DRIVER_NAME))
            .andExpect(jsonPath("$.driver_email").value(DEFAULT_DRIVER_EMAIL))
            .andExpect(jsonPath("$.driver_address").value(DEFAULT_DRIVER_ADDRESS))
            .andExpect(jsonPath("$.driver_phone_no").value(DEFAULT_DRIVER_PHONE_NO))
            .andExpect(jsonPath("$.vehicle_plate_no").value(DEFAULT_VEHICLE_PLATE_NO))
            .andExpect(jsonPath("$.vehicle_type").value(DEFAULT_VEHICLE_TYPE))
            .andExpect(jsonPath("$.vehicle_status").value(DEFAULT_VEHICLE_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingFleet() throws Exception {
        // Get the fleet
        restFleetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFleet() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();

        // Update the fleet
        Fleet updatedFleet = fleetRepository.findById(fleet.getId()).get();
        // Disconnect from session so that the updates on updatedFleet are not directly saved in db
        em.detach(updatedFleet);
        updatedFleet
            .driver_name(UPDATED_DRIVER_NAME)
            .driver_email(UPDATED_DRIVER_EMAIL)
            .driver_address(UPDATED_DRIVER_ADDRESS)
            .driver_phone_no(UPDATED_DRIVER_PHONE_NO)
            .vehicle_plate_no(UPDATED_VEHICLE_PLATE_NO)
            .vehicle_type(UPDATED_VEHICLE_TYPE)
            .vehicle_status(UPDATED_VEHICLE_STATUS);

        restFleetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFleet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFleet))
            )
            .andExpect(status().isOk());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
        Fleet testFleet = fleetList.get(fleetList.size() - 1);
        assertThat(testFleet.getDriver_name()).isEqualTo(UPDATED_DRIVER_NAME);
        assertThat(testFleet.getDriver_email()).isEqualTo(UPDATED_DRIVER_EMAIL);
        assertThat(testFleet.getDriver_address()).isEqualTo(UPDATED_DRIVER_ADDRESS);
        assertThat(testFleet.getDriver_phone_no()).isEqualTo(UPDATED_DRIVER_PHONE_NO);
        assertThat(testFleet.getVehicle_plate_no()).isEqualTo(UPDATED_VEHICLE_PLATE_NO);
        assertThat(testFleet.getVehicle_type()).isEqualTo(UPDATED_VEHICLE_TYPE);
        assertThat(testFleet.getVehicle_status()).isEqualTo(UPDATED_VEHICLE_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fleet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fleet))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fleet))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFleetWithPatch() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();

        // Update the fleet using partial update
        Fleet partialUpdatedFleet = new Fleet();
        partialUpdatedFleet.setId(fleet.getId());

        partialUpdatedFleet
            .driver_name(UPDATED_DRIVER_NAME)
            .driver_address(UPDATED_DRIVER_ADDRESS)
            .driver_phone_no(UPDATED_DRIVER_PHONE_NO)
            .vehicle_plate_no(UPDATED_VEHICLE_PLATE_NO)
            .vehicle_type(UPDATED_VEHICLE_TYPE);

        restFleetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFleet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFleet))
            )
            .andExpect(status().isOk());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
        Fleet testFleet = fleetList.get(fleetList.size() - 1);
        assertThat(testFleet.getDriver_name()).isEqualTo(UPDATED_DRIVER_NAME);
        assertThat(testFleet.getDriver_email()).isEqualTo(DEFAULT_DRIVER_EMAIL);
        assertThat(testFleet.getDriver_address()).isEqualTo(UPDATED_DRIVER_ADDRESS);
        assertThat(testFleet.getDriver_phone_no()).isEqualTo(UPDATED_DRIVER_PHONE_NO);
        assertThat(testFleet.getVehicle_plate_no()).isEqualTo(UPDATED_VEHICLE_PLATE_NO);
        assertThat(testFleet.getVehicle_type()).isEqualTo(UPDATED_VEHICLE_TYPE);
        assertThat(testFleet.getVehicle_status()).isEqualTo(DEFAULT_VEHICLE_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateFleetWithPatch() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();

        // Update the fleet using partial update
        Fleet partialUpdatedFleet = new Fleet();
        partialUpdatedFleet.setId(fleet.getId());

        partialUpdatedFleet
            .driver_name(UPDATED_DRIVER_NAME)
            .driver_email(UPDATED_DRIVER_EMAIL)
            .driver_address(UPDATED_DRIVER_ADDRESS)
            .driver_phone_no(UPDATED_DRIVER_PHONE_NO)
            .vehicle_plate_no(UPDATED_VEHICLE_PLATE_NO)
            .vehicle_type(UPDATED_VEHICLE_TYPE)
            .vehicle_status(UPDATED_VEHICLE_STATUS);

        restFleetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFleet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFleet))
            )
            .andExpect(status().isOk());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
        Fleet testFleet = fleetList.get(fleetList.size() - 1);
        assertThat(testFleet.getDriver_name()).isEqualTo(UPDATED_DRIVER_NAME);
        assertThat(testFleet.getDriver_email()).isEqualTo(UPDATED_DRIVER_EMAIL);
        assertThat(testFleet.getDriver_address()).isEqualTo(UPDATED_DRIVER_ADDRESS);
        assertThat(testFleet.getDriver_phone_no()).isEqualTo(UPDATED_DRIVER_PHONE_NO);
        assertThat(testFleet.getVehicle_plate_no()).isEqualTo(UPDATED_VEHICLE_PLATE_NO);
        assertThat(testFleet.getVehicle_type()).isEqualTo(UPDATED_VEHICLE_TYPE);
        assertThat(testFleet.getVehicle_status()).isEqualTo(UPDATED_VEHICLE_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, fleet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fleet))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fleet))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFleet() throws Exception {
        int databaseSizeBeforeUpdate = fleetRepository.findAll().size();
        fleet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFleetMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(fleet)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fleet in the database
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFleet() throws Exception {
        // Initialize the database
        fleetRepository.saveAndFlush(fleet);

        int databaseSizeBeforeDelete = fleetRepository.findAll().size();

        // Delete the fleet
        restFleetMockMvc
            .perform(delete(ENTITY_API_URL_ID, fleet.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fleet> fleetList = fleetRepository.findAll();
        assertThat(fleetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
