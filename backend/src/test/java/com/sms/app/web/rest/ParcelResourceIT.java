package com.sms.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sms.app.IntegrationTest;
import com.sms.app.domain.Parcel;
import com.sms.app.repository.ParcelRepository;
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
 * Integration tests for the {@link ParcelResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ParcelResourceIT {

    private static final String DEFAULT_SENDER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SENDER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SENDER_EMAIL = "K@l";
    private static final String UPDATED_SENDER_EMAIL = "ahWUV@iA1k";

    private static final String DEFAULT_SENDER_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_SENDER_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_SENDER_PHONE_NO = "355370";
    private static final String UPDATED_SENDER_PHONE_NO = "455355";

    private static final String DEFAULT_RECEIVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVER_EMAIL = "6l-BH@Ybwu";
    private static final String UPDATED_RECEIVER_EMAIL = "4Yc@m8Nbeb";

    private static final String DEFAULT_RECEIVER_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVER_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVER_PHONE_NO = "204391";
    private static final String UPDATED_RECEIVER_PHONE_NO = "40";

    private static final String DEFAULT_PARCEL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARCEL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PARCEL_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PARCEL_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_PARCEL_WEIGHT_IN_KG = 1F;
    private static final Float UPDATED_PARCEL_WEIGHT_IN_KG = 2F;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/parcels";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParcelMockMvc;

    private Parcel parcel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parcel createEntity(EntityManager em) {
        Parcel parcel = new Parcel()
            .sender_name(DEFAULT_SENDER_NAME)
            .sender_email(DEFAULT_SENDER_EMAIL)
            .sender_address(DEFAULT_SENDER_ADDRESS)
            .sender_phone_no(DEFAULT_SENDER_PHONE_NO)
            .receiver_name(DEFAULT_RECEIVER_NAME)
            .receiver_email(DEFAULT_RECEIVER_EMAIL)
            .receiver_address(DEFAULT_RECEIVER_ADDRESS)
            .receiver_phone_no(DEFAULT_RECEIVER_PHONE_NO)
            .parcel_name(DEFAULT_PARCEL_NAME)
            .parcel_type(DEFAULT_PARCEL_TYPE)
            .parcel_weight_in_kg(DEFAULT_PARCEL_WEIGHT_IN_KG)
            .status(DEFAULT_STATUS);
        return parcel;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parcel createUpdatedEntity(EntityManager em) {
        Parcel parcel = new Parcel()
            .sender_name(UPDATED_SENDER_NAME)
            .sender_email(UPDATED_SENDER_EMAIL)
            .sender_address(UPDATED_SENDER_ADDRESS)
            .sender_phone_no(UPDATED_SENDER_PHONE_NO)
            .receiver_name(UPDATED_RECEIVER_NAME)
            .receiver_email(UPDATED_RECEIVER_EMAIL)
            .receiver_address(UPDATED_RECEIVER_ADDRESS)
            .receiver_phone_no(UPDATED_RECEIVER_PHONE_NO)
            .parcel_name(UPDATED_PARCEL_NAME)
            .parcel_type(UPDATED_PARCEL_TYPE)
            .parcel_weight_in_kg(UPDATED_PARCEL_WEIGHT_IN_KG)
            .status(UPDATED_STATUS);
        return parcel;
    }

    @BeforeEach
    public void initTest() {
        parcel = createEntity(em);
    }

    @Test
    @Transactional
    void createParcel() throws Exception {
        int databaseSizeBeforeCreate = parcelRepository.findAll().size();
        // Create the Parcel
        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isCreated());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate + 1);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getSender_name()).isEqualTo(DEFAULT_SENDER_NAME);
        assertThat(testParcel.getSender_email()).isEqualTo(DEFAULT_SENDER_EMAIL);
        assertThat(testParcel.getSender_address()).isEqualTo(DEFAULT_SENDER_ADDRESS);
        assertThat(testParcel.getSender_phone_no()).isEqualTo(DEFAULT_SENDER_PHONE_NO);
        assertThat(testParcel.getReceiver_name()).isEqualTo(DEFAULT_RECEIVER_NAME);
        assertThat(testParcel.getReceiver_email()).isEqualTo(DEFAULT_RECEIVER_EMAIL);
        assertThat(testParcel.getReceiver_address()).isEqualTo(DEFAULT_RECEIVER_ADDRESS);
        assertThat(testParcel.getReceiver_phone_no()).isEqualTo(DEFAULT_RECEIVER_PHONE_NO);
        assertThat(testParcel.getParcel_name()).isEqualTo(DEFAULT_PARCEL_NAME);
        assertThat(testParcel.getParcel_type()).isEqualTo(DEFAULT_PARCEL_TYPE);
        assertThat(testParcel.getParcel_weight_in_kg()).isEqualTo(DEFAULT_PARCEL_WEIGHT_IN_KG);
        assertThat(testParcel.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createParcelWithExistingId() throws Exception {
        // Create the Parcel with an existing ID
        parcel.setId(1L);

        int databaseSizeBeforeCreate = parcelRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSender_nameIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setSender_name(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSender_emailIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setSender_email(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSender_addressIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setSender_address(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSender_phone_noIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setSender_phone_no(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReceiver_nameIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setReceiver_name(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReceiver_emailIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setReceiver_email(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReceiver_addressIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setReceiver_address(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReceiver_phone_noIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setReceiver_phone_no(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkParcel_nameIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setParcel_name(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkParcel_typeIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setParcel_type(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkParcel_weight_in_kgIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setParcel_weight_in_kg(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = parcelRepository.findAll().size();
        // set the field null
        parcel.setStatus(null);

        // Create the Parcel, which fails.

        restParcelMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isBadRequest());

        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllParcels() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get all the parcelList
        restParcelMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].sender_name").value(hasItem(DEFAULT_SENDER_NAME)))
            .andExpect(jsonPath("$.[*].sender_email").value(hasItem(DEFAULT_SENDER_EMAIL)))
            .andExpect(jsonPath("$.[*].sender_address").value(hasItem(DEFAULT_SENDER_ADDRESS)))
            .andExpect(jsonPath("$.[*].sender_phone_no").value(hasItem(DEFAULT_SENDER_PHONE_NO)))
            .andExpect(jsonPath("$.[*].receiver_name").value(hasItem(DEFAULT_RECEIVER_NAME)))
            .andExpect(jsonPath("$.[*].receiver_email").value(hasItem(DEFAULT_RECEIVER_EMAIL)))
            .andExpect(jsonPath("$.[*].receiver_address").value(hasItem(DEFAULT_RECEIVER_ADDRESS)))
            .andExpect(jsonPath("$.[*].receiver_phone_no").value(hasItem(DEFAULT_RECEIVER_PHONE_NO)))
            .andExpect(jsonPath("$.[*].parcel_name").value(hasItem(DEFAULT_PARCEL_NAME)))
            .andExpect(jsonPath("$.[*].parcel_type").value(hasItem(DEFAULT_PARCEL_TYPE)))
            .andExpect(jsonPath("$.[*].parcel_weight_in_kg").value(hasItem(DEFAULT_PARCEL_WEIGHT_IN_KG.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        // Get the parcel
        restParcelMockMvc
            .perform(get(ENTITY_API_URL_ID, parcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(parcel.getId().intValue()))
            .andExpect(jsonPath("$.sender_name").value(DEFAULT_SENDER_NAME))
            .andExpect(jsonPath("$.sender_email").value(DEFAULT_SENDER_EMAIL))
            .andExpect(jsonPath("$.sender_address").value(DEFAULT_SENDER_ADDRESS))
            .andExpect(jsonPath("$.sender_phone_no").value(DEFAULT_SENDER_PHONE_NO))
            .andExpect(jsonPath("$.receiver_name").value(DEFAULT_RECEIVER_NAME))
            .andExpect(jsonPath("$.receiver_email").value(DEFAULT_RECEIVER_EMAIL))
            .andExpect(jsonPath("$.receiver_address").value(DEFAULT_RECEIVER_ADDRESS))
            .andExpect(jsonPath("$.receiver_phone_no").value(DEFAULT_RECEIVER_PHONE_NO))
            .andExpect(jsonPath("$.parcel_name").value(DEFAULT_PARCEL_NAME))
            .andExpect(jsonPath("$.parcel_type").value(DEFAULT_PARCEL_TYPE))
            .andExpect(jsonPath("$.parcel_weight_in_kg").value(DEFAULT_PARCEL_WEIGHT_IN_KG.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingParcel() throws Exception {
        // Get the parcel
        restParcelMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Update the parcel
        Parcel updatedParcel = parcelRepository.findById(parcel.getId()).get();
        // Disconnect from session so that the updates on updatedParcel are not directly saved in db
        em.detach(updatedParcel);
        updatedParcel
            .sender_name(UPDATED_SENDER_NAME)
            .sender_email(UPDATED_SENDER_EMAIL)
            .sender_address(UPDATED_SENDER_ADDRESS)
            .sender_phone_no(UPDATED_SENDER_PHONE_NO)
            .receiver_name(UPDATED_RECEIVER_NAME)
            .receiver_email(UPDATED_RECEIVER_EMAIL)
            .receiver_address(UPDATED_RECEIVER_ADDRESS)
            .receiver_phone_no(UPDATED_RECEIVER_PHONE_NO)
            .parcel_name(UPDATED_PARCEL_NAME)
            .parcel_type(UPDATED_PARCEL_TYPE)
            .parcel_weight_in_kg(UPDATED_PARCEL_WEIGHT_IN_KG)
            .status(UPDATED_STATUS);

        restParcelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedParcel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedParcel))
            )
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getSender_name()).isEqualTo(UPDATED_SENDER_NAME);
        assertThat(testParcel.getSender_email()).isEqualTo(UPDATED_SENDER_EMAIL);
        assertThat(testParcel.getSender_address()).isEqualTo(UPDATED_SENDER_ADDRESS);
        assertThat(testParcel.getSender_phone_no()).isEqualTo(UPDATED_SENDER_PHONE_NO);
        assertThat(testParcel.getReceiver_name()).isEqualTo(UPDATED_RECEIVER_NAME);
        assertThat(testParcel.getReceiver_email()).isEqualTo(UPDATED_RECEIVER_EMAIL);
        assertThat(testParcel.getReceiver_address()).isEqualTo(UPDATED_RECEIVER_ADDRESS);
        assertThat(testParcel.getReceiver_phone_no()).isEqualTo(UPDATED_RECEIVER_PHONE_NO);
        assertThat(testParcel.getParcel_name()).isEqualTo(UPDATED_PARCEL_NAME);
        assertThat(testParcel.getParcel_type()).isEqualTo(UPDATED_PARCEL_TYPE);
        assertThat(testParcel.getParcel_weight_in_kg()).isEqualTo(UPDATED_PARCEL_WEIGHT_IN_KG);
        assertThat(testParcel.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, parcel.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parcel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parcel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateParcelWithPatch() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Update the parcel using partial update
        Parcel partialUpdatedParcel = new Parcel();
        partialUpdatedParcel.setId(parcel.getId());

        partialUpdatedParcel
            .sender_name(UPDATED_SENDER_NAME)
            .sender_email(UPDATED_SENDER_EMAIL)
            .sender_phone_no(UPDATED_SENDER_PHONE_NO)
            .receiver_name(UPDATED_RECEIVER_NAME)
            .receiver_email(UPDATED_RECEIVER_EMAIL)
            .receiver_address(UPDATED_RECEIVER_ADDRESS)
            .parcel_name(UPDATED_PARCEL_NAME)
            .parcel_type(UPDATED_PARCEL_TYPE)
            .parcel_weight_in_kg(UPDATED_PARCEL_WEIGHT_IN_KG);

        restParcelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParcel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParcel))
            )
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getSender_name()).isEqualTo(UPDATED_SENDER_NAME);
        assertThat(testParcel.getSender_email()).isEqualTo(UPDATED_SENDER_EMAIL);
        assertThat(testParcel.getSender_address()).isEqualTo(DEFAULT_SENDER_ADDRESS);
        assertThat(testParcel.getSender_phone_no()).isEqualTo(UPDATED_SENDER_PHONE_NO);
        assertThat(testParcel.getReceiver_name()).isEqualTo(UPDATED_RECEIVER_NAME);
        assertThat(testParcel.getReceiver_email()).isEqualTo(UPDATED_RECEIVER_EMAIL);
        assertThat(testParcel.getReceiver_address()).isEqualTo(UPDATED_RECEIVER_ADDRESS);
        assertThat(testParcel.getReceiver_phone_no()).isEqualTo(DEFAULT_RECEIVER_PHONE_NO);
        assertThat(testParcel.getParcel_name()).isEqualTo(UPDATED_PARCEL_NAME);
        assertThat(testParcel.getParcel_type()).isEqualTo(UPDATED_PARCEL_TYPE);
        assertThat(testParcel.getParcel_weight_in_kg()).isEqualTo(UPDATED_PARCEL_WEIGHT_IN_KG);
        assertThat(testParcel.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateParcelWithPatch() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();

        // Update the parcel using partial update
        Parcel partialUpdatedParcel = new Parcel();
        partialUpdatedParcel.setId(parcel.getId());

        partialUpdatedParcel
            .sender_name(UPDATED_SENDER_NAME)
            .sender_email(UPDATED_SENDER_EMAIL)
            .sender_address(UPDATED_SENDER_ADDRESS)
            .sender_phone_no(UPDATED_SENDER_PHONE_NO)
            .receiver_name(UPDATED_RECEIVER_NAME)
            .receiver_email(UPDATED_RECEIVER_EMAIL)
            .receiver_address(UPDATED_RECEIVER_ADDRESS)
            .receiver_phone_no(UPDATED_RECEIVER_PHONE_NO)
            .parcel_name(UPDATED_PARCEL_NAME)
            .parcel_type(UPDATED_PARCEL_TYPE)
            .parcel_weight_in_kg(UPDATED_PARCEL_WEIGHT_IN_KG)
            .status(UPDATED_STATUS);

        restParcelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParcel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParcel))
            )
            .andExpect(status().isOk());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
        Parcel testParcel = parcelList.get(parcelList.size() - 1);
        assertThat(testParcel.getSender_name()).isEqualTo(UPDATED_SENDER_NAME);
        assertThat(testParcel.getSender_email()).isEqualTo(UPDATED_SENDER_EMAIL);
        assertThat(testParcel.getSender_address()).isEqualTo(UPDATED_SENDER_ADDRESS);
        assertThat(testParcel.getSender_phone_no()).isEqualTo(UPDATED_SENDER_PHONE_NO);
        assertThat(testParcel.getReceiver_name()).isEqualTo(UPDATED_RECEIVER_NAME);
        assertThat(testParcel.getReceiver_email()).isEqualTo(UPDATED_RECEIVER_EMAIL);
        assertThat(testParcel.getReceiver_address()).isEqualTo(UPDATED_RECEIVER_ADDRESS);
        assertThat(testParcel.getReceiver_phone_no()).isEqualTo(UPDATED_RECEIVER_PHONE_NO);
        assertThat(testParcel.getParcel_name()).isEqualTo(UPDATED_PARCEL_NAME);
        assertThat(testParcel.getParcel_type()).isEqualTo(UPDATED_PARCEL_TYPE);
        assertThat(testParcel.getParcel_weight_in_kg()).isEqualTo(UPDATED_PARCEL_WEIGHT_IN_KG);
        assertThat(testParcel.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, parcel.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parcel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parcel))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamParcel() throws Exception {
        int databaseSizeBeforeUpdate = parcelRepository.findAll().size();
        parcel.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParcelMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(parcel)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Parcel in the database
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteParcel() throws Exception {
        // Initialize the database
        parcelRepository.saveAndFlush(parcel);

        int databaseSizeBeforeDelete = parcelRepository.findAll().size();

        // Delete the parcel
        restParcelMockMvc
            .perform(delete(ENTITY_API_URL_ID, parcel.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parcel> parcelList = parcelRepository.findAll();
        assertThat(parcelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
