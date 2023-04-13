package com.sms.app.web.rest;

import com.sms.app.domain.Parcel;
import com.sms.app.repository.ParcelRepository;
import com.sms.app.service.ParcelService;
import com.sms.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sms.app.domain.Parcel}.
 */
@RestController
@RequestMapping("/api")
public class ParcelResource {

    private final Logger log = LoggerFactory.getLogger(ParcelResource.class);

    private static final String ENTITY_NAME = "parcel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParcelService parcelService;

    private final ParcelRepository parcelRepository;

    public ParcelResource(ParcelService parcelService, ParcelRepository parcelRepository) {
        this.parcelService = parcelService;
        this.parcelRepository = parcelRepository;
    }

    /**
     * {@code POST  /parcels} : Create a new parcel.
     *
     * @param parcel the parcel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parcel, or with status {@code 400 (Bad Request)} if the parcel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parcels")
    public ResponseEntity<Parcel> createParcel(@Valid @RequestBody Parcel parcel) throws URISyntaxException {
        log.debug("REST request to save Parcel : {}", parcel);
        if (parcel.getId() != null) {
            throw new BadRequestAlertException("A new parcel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parcel result = parcelService.save(parcel);
        return ResponseEntity
            .created(new URI("/api/parcels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parcels/:id} : Updates an existing parcel.
     *
     * @param id the id of the parcel to save.
     * @param parcel the parcel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parcel,
     * or with status {@code 400 (Bad Request)} if the parcel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parcel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parcels/{id}")
    public ResponseEntity<Parcel> updateParcel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Parcel parcel
    ) throws URISyntaxException {
        log.debug("REST request to update Parcel : {}, {}", id, parcel);
        if (parcel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parcel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parcelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Parcel result = parcelService.update(parcel);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parcel.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /parcels/:id} : Partial updates given fields of an existing parcel, field will ignore if it is null
     *
     * @param id the id of the parcel to save.
     * @param parcel the parcel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parcel,
     * or with status {@code 400 (Bad Request)} if the parcel is not valid,
     * or with status {@code 404 (Not Found)} if the parcel is not found,
     * or with status {@code 500 (Internal Server Error)} if the parcel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/parcels/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Parcel> partialUpdateParcel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Parcel parcel
    ) throws URISyntaxException {
        log.debug("REST request to partial update Parcel partially : {}, {}", id, parcel);
        if (parcel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parcel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parcelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Parcel> result = parcelService.partialUpdate(parcel);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parcel.getId().toString())
        );
    }

    /**
     * {@code GET  /parcels} : get all the parcels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parcels in body.
     */
    @GetMapping("/parcels")
    public List<Parcel> getAllParcels() {
        log.debug("REST request to get all Parcels");
        return parcelService.findAll();
    }

    /**
     * {@code GET  /parcels/:id} : get the "id" parcel.
     *
     * @param id the id of the parcel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parcel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parcels/{id}")
    public ResponseEntity<Parcel> getParcel(@PathVariable Long id) {
        log.debug("REST request to get Parcel : {}", id);
        Optional<Parcel> parcel = parcelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parcel);
    }

    /**
     * {@code DELETE  /parcels/:id} : delete the "id" parcel.
     *
     * @param id the id of the parcel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parcels/{id}")
    public ResponseEntity<Void> deleteParcel(@PathVariable Long id) {
        log.debug("REST request to delete Parcel : {}", id);
        parcelService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
