package com.sms.app.web.rest;

import com.sms.app.domain.Fleet;
import com.sms.app.repository.FleetRepository;
import com.sms.app.service.FleetService;
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
 * REST controller for managing {@link com.sms.app.domain.Fleet}.
 */
@RestController
@RequestMapping("/api")
public class FleetResource {

    private final Logger log = LoggerFactory.getLogger(FleetResource.class);

    private static final String ENTITY_NAME = "fleet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FleetService fleetService;

    private final FleetRepository fleetRepository;

    public FleetResource(FleetService fleetService, FleetRepository fleetRepository) {
        this.fleetService = fleetService;
        this.fleetRepository = fleetRepository;
    }

    /**
     * {@code POST  /fleets} : Create a new fleet.
     *
     * @param fleet the fleet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fleet, or with status {@code 400 (Bad Request)} if the fleet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fleets")
    public ResponseEntity<Fleet> createFleet(@Valid @RequestBody Fleet fleet) throws URISyntaxException {
        log.debug("REST request to save Fleet : {}", fleet);
        if (fleet.getId() != null) {
            throw new BadRequestAlertException("A new fleet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fleet result = fleetService.save(fleet);
        return ResponseEntity
            .created(new URI("/api/fleets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fleets/:id} : Updates an existing fleet.
     *
     * @param id the id of the fleet to save.
     * @param fleet the fleet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fleet,
     * or with status {@code 400 (Bad Request)} if the fleet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fleet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fleets/{id}")
    public ResponseEntity<Fleet> updateFleet(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Fleet fleet)
        throws URISyntaxException {
        log.debug("REST request to update Fleet : {}, {}", id, fleet);
        if (fleet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fleet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fleetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Fleet result = fleetService.update(fleet);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fleet.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fleets/:id} : Partial updates given fields of an existing fleet, field will ignore if it is null
     *
     * @param id the id of the fleet to save.
     * @param fleet the fleet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fleet,
     * or with status {@code 400 (Bad Request)} if the fleet is not valid,
     * or with status {@code 404 (Not Found)} if the fleet is not found,
     * or with status {@code 500 (Internal Server Error)} if the fleet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fleets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fleet> partialUpdateFleet(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Fleet fleet
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fleet partially : {}, {}", id, fleet);
        if (fleet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fleet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fleetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fleet> result = fleetService.partialUpdate(fleet);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fleet.getId().toString())
        );
    }

    /**
     * {@code GET  /fleets} : get all the fleets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fleets in body.
     */
    @GetMapping("/fleets")
    public List<Fleet> getAllFleets() {
        log.debug("REST request to get all Fleets");
        return fleetService.findAll();
    }

    /**
     * {@code GET  /fleets/:id} : get the "id" fleet.
     *
     * @param id the id of the fleet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fleet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fleets/{id}")
    public ResponseEntity<Fleet> getFleet(@PathVariable Long id) {
        log.debug("REST request to get Fleet : {}", id);
        Optional<Fleet> fleet = fleetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fleet);
    }

    /**
     * {@code DELETE  /fleets/:id} : delete the "id" fleet.
     *
     * @param id the id of the fleet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fleets/{id}")
    public ResponseEntity<Void> deleteFleet(@PathVariable Long id) {
        log.debug("REST request to delete Fleet : {}", id);
        fleetService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
