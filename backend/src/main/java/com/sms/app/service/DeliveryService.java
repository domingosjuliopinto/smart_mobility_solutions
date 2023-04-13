package com.sms.app.service;

import com.sms.app.domain.Delivery;
import com.sms.app.repository.DeliveryRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Delivery}.
 */
@Service
@Transactional
public class DeliveryService {

    private final Logger log = LoggerFactory.getLogger(DeliveryService.class);

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    /**
     * Save a delivery.
     *
     * @param delivery the entity to save.
     * @return the persisted entity.
     */
    public Delivery save(Delivery delivery) {
        log.debug("Request to save Delivery : {}", delivery);
        return deliveryRepository.save(delivery);
    }

    /**
     * Update a delivery.
     *
     * @param delivery the entity to save.
     * @return the persisted entity.
     */
    public Delivery update(Delivery delivery) {
        log.debug("Request to update Delivery : {}", delivery);
        return deliveryRepository.save(delivery);
    }

    /**
     * Partially update a delivery.
     *
     * @param delivery the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Delivery> partialUpdate(Delivery delivery) {
        log.debug("Request to partially update Delivery : {}", delivery);

        return deliveryRepository
            .findById(delivery.getId())
            .map(existingDelivery -> {
                if (delivery.getParcel_id() != null) {
                    existingDelivery.setParcel_id(delivery.getParcel_id());
                }
                if (delivery.getDriver_id() != null) {
                    existingDelivery.setDriver_id(delivery.getDriver_id());
                }
                if (delivery.getRequest_time() != null) {
                    existingDelivery.setRequest_time(delivery.getRequest_time());
                }
                if (delivery.getAssigned_time() != null) {
                    existingDelivery.setAssigned_time(delivery.getAssigned_time());
                }
                if (delivery.getEstimated_time() != null) {
                    existingDelivery.setEstimated_time(delivery.getEstimated_time());
                }
                if (delivery.getEnded_time() != null) {
                    existingDelivery.setEnded_time(delivery.getEnded_time());
                }
                if (delivery.getStar_received() != null) {
                    existingDelivery.setStar_received(delivery.getStar_received());
                }
                if (delivery.getDelivery_status() != null) {
                    existingDelivery.setDelivery_status(delivery.getDelivery_status());
                }

                return existingDelivery;
            })
            .map(deliveryRepository::save);
    }

    /**
     * Get all the deliveries.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Delivery> findAll() {
        log.debug("Request to get all Deliveries");
        return deliveryRepository.findAll();
    }

    /**
     * Get one delivery by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Delivery> findOne(Long id) {
        log.debug("Request to get Delivery : {}", id);
        return deliveryRepository.findById(id);
    }

    /**
     * Delete the delivery by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Delivery : {}", id);
        deliveryRepository.deleteById(id);
    }
}
