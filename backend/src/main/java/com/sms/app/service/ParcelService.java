package com.sms.app.service;

import com.sms.app.domain.Parcel;
import com.sms.app.repository.ParcelRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Parcel}.
 */
@Service
@Transactional
public class ParcelService {

    private final Logger log = LoggerFactory.getLogger(ParcelService.class);

    private final ParcelRepository parcelRepository;

    public ParcelService(ParcelRepository parcelRepository) {
        this.parcelRepository = parcelRepository;
    }

    /**
     * Save a parcel.
     *
     * @param parcel the entity to save.
     * @return the persisted entity.
     */
    public Parcel save(Parcel parcel) {
        log.debug("Request to save Parcel : {}", parcel);
        return parcelRepository.save(parcel);
    }

    /**
     * Update a parcel.
     *
     * @param parcel the entity to save.
     * @return the persisted entity.
     */
    public Parcel update(Parcel parcel) {
        log.debug("Request to update Parcel : {}", parcel);
        return parcelRepository.save(parcel);
    }

    /**
     * Partially update a parcel.
     *
     * @param parcel the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Parcel> partialUpdate(Parcel parcel) {
        log.debug("Request to partially update Parcel : {}", parcel);

        return parcelRepository
            .findById(parcel.getId())
            .map(existingParcel -> {
                if (parcel.getSender_name() != null) {
                    existingParcel.setSender_name(parcel.getSender_name());
                }
                if (parcel.getSender_email() != null) {
                    existingParcel.setSender_email(parcel.getSender_email());
                }
                if (parcel.getSender_address() != null) {
                    existingParcel.setSender_address(parcel.getSender_address());
                }
                if (parcel.getSender_phone_no() != null) {
                    existingParcel.setSender_phone_no(parcel.getSender_phone_no());
                }
                if (parcel.getReceiver_name() != null) {
                    existingParcel.setReceiver_name(parcel.getReceiver_name());
                }
                if (parcel.getReceiver_email() != null) {
                    existingParcel.setReceiver_email(parcel.getReceiver_email());
                }
                if (parcel.getReceiver_address() != null) {
                    existingParcel.setReceiver_address(parcel.getReceiver_address());
                }
                if (parcel.getReceiver_phone_no() != null) {
                    existingParcel.setReceiver_phone_no(parcel.getReceiver_phone_no());
                }
                if (parcel.getParcel_name() != null) {
                    existingParcel.setParcel_name(parcel.getParcel_name());
                }
                if (parcel.getParcel_type() != null) {
                    existingParcel.setParcel_type(parcel.getParcel_type());
                }
                if (parcel.getParcel_weight_in_kg() != null) {
                    existingParcel.setParcel_weight_in_kg(parcel.getParcel_weight_in_kg());
                }
                if (parcel.getStatus() != null) {
                    existingParcel.setStatus(parcel.getStatus());
                }

                return existingParcel;
            })
            .map(parcelRepository::save);
    }

    /**
     * Get all the parcels.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Parcel> findAll() {
        log.debug("Request to get all Parcels");
        return parcelRepository.findAll();
    }

    /**
     * Get one parcel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Parcel> findOne(Long id) {
        log.debug("Request to get Parcel : {}", id);
        return parcelRepository.findById(id);
    }

    /**
     * Delete the parcel by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Parcel : {}", id);
        parcelRepository.deleteById(id);
    }
}
