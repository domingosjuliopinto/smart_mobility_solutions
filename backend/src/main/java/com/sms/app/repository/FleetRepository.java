package com.sms.app.repository;

import com.sms.app.domain.Fleet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Fleet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FleetRepository extends JpaRepository<Fleet, Long> {}
