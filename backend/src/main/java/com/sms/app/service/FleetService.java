package com.sms.app.service;

import com.sms.app.domain.Fleet;
import com.sms.app.repository.FleetRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Fleet}.
 */
@Service
@Transactional
public class FleetService {

    private final Logger log = LoggerFactory.getLogger(FleetService.class);

    private final FleetRepository fleetRepository;

    public FleetService(FleetRepository fleetRepository) {
        this.fleetRepository = fleetRepository;
    }

    /**
     * Save a fleet.
     *
     * @param fleet the entity to save.
     * @return the persisted entity.
     */
    public Fleet save(Fleet fleet) {
        log.debug("Request to save Fleet : {}", fleet);
        return fleetRepository.save(fleet);
    }

    /**
     * Update a fleet.
     *
     * @param fleet the entity to save.
     * @return the persisted entity.
     */
    public Fleet update(Fleet fleet) {
        log.debug("Request to update Fleet : {}", fleet);
        return fleetRepository.save(fleet);
    }

    /**
     * Partially update a fleet.
     *
     * @param fleet the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Fleet> partialUpdate(Fleet fleet) {
        log.debug("Request to partially update Fleet : {}", fleet);

        return fleetRepository
            .findById(fleet.getId())
            .map(existingFleet -> {
                if (fleet.getDriver_name() != null) {
                    existingFleet.setDriver_name(fleet.getDriver_name());
                }
                if (fleet.getDriver_email() != null) {
                    existingFleet.setDriver_email(fleet.getDriver_email());
                }
                if (fleet.getDriver_address() != null) {
                    existingFleet.setDriver_address(fleet.getDriver_address());
                }
                if (fleet.getDriver_phone_no() != null) {
                    existingFleet.setDriver_phone_no(fleet.getDriver_phone_no());
                }
                if (fleet.getVehicle_plate_no() != null) {
                    existingFleet.setVehicle_plate_no(fleet.getVehicle_plate_no());
                }
                if (fleet.getVehicle_type() != null) {
                    existingFleet.setVehicle_type(fleet.getVehicle_type());
                }
                if (fleet.getVehicle_status() != null) {
                    existingFleet.setVehicle_status(fleet.getVehicle_status());
                }

                return existingFleet;
            })
            .map(fleetRepository::save);
    }

    /**
     * Get all the fleets.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Fleet> findAll() {
        log.debug("Request to get all Fleets");
        return fleetRepository.findAll();
    }

    /**
     * Get one fleet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Fleet> findOne(Long id) {
        log.debug("Request to get Fleet : {}", id);
        return fleetRepository.findById(id);
    }

    /**
     * Delete the fleet by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Fleet : {}", id);
        fleetRepository.deleteById(id);
    }
}
