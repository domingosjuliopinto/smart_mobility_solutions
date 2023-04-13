package com.sms.app.repository;

import com.sms.app.domain.Parcel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Parcel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcelRepository extends JpaRepository<Parcel, Long> {}
