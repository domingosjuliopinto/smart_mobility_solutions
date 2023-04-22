package com.sms.app.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "parcel_id", nullable = false, unique = true)
    private Integer parcel_id;

    @Column(name = "driver_id")
    private Integer driver_id;

    @NotNull
    @Column(name = "request_time", nullable = false)
    private Instant request_time;

    @Column(name = "assigned_time")
    private Instant assigned_time;

    @Column(name = "estimated_time")
    private Instant estimated_time;

    @Column(name = "ended_time")
    private Instant ended_time;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "star_received")
    private Integer star_received;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Delivery id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getParcel_id() {
        return this.parcel_id;
    }

    public Delivery parcel_id(Integer parcel_id) {
        this.setParcel_id(parcel_id);
        return this;
    }

    public void setParcel_id(Integer parcel_id) {
        this.parcel_id = parcel_id;
    }

    public Integer getDriver_id() {
        return this.driver_id;
    }

    public Delivery driver_id(Integer driver_id) {
        this.setDriver_id(driver_id);
        return this;
    }

    public void setDriver_id(Integer driver_id) {
        this.driver_id = driver_id;
    }

    public Instant getRequest_time() {
        return this.request_time;
    }

    public Delivery request_time(Instant request_time) {
        this.setRequest_time(request_time);
        return this;
    }

    public void setRequest_time(Instant request_time) {
        this.request_time = request_time;
    }

    public Instant getAssigned_time() {
        return this.assigned_time;
    }

    public Delivery assigned_time(Instant assigned_time) {
        this.setAssigned_time(assigned_time);
        return this;
    }

    public void setAssigned_time(Instant assigned_time) {
        this.assigned_time = assigned_time;
    }

    public Instant getEstimated_time() {
        return this.estimated_time;
    }

    public Delivery estimated_time(Instant estimated_time) {
        this.setEstimated_time(estimated_time);
        return this;
    }

    public void setEstimated_time(Instant estimated_time) {
        this.estimated_time = estimated_time;
    }

    public Instant getEnded_time() {
        return this.ended_time;
    }

    public Delivery ended_time(Instant ended_time) {
        this.setEnded_time(ended_time);
        return this;
    }

    public void setEnded_time(Instant ended_time) {
        this.ended_time = ended_time;
    }

    public Integer getStar_received() {
        return this.star_received;
    }

    public Delivery star_received(Integer star_received) {
        this.setStar_received(star_received);
        return this;
    }

    public void setStar_received(Integer star_received) {
        this.star_received = star_received;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Delivery)) {
            return false;
        }
        return id != null && id.equals(((Delivery) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", parcel_id=" + getParcel_id() +
            ", driver_id=" + getDriver_id() +
            ", request_time='" + getRequest_time() + "'" +
            ", assigned_time='" + getAssigned_time() + "'" +
            ", estimated_time='" + getEstimated_time() + "'" +
            ", ended_time='" + getEnded_time() + "'" +
            ", star_received=" + getStar_received() +
            "}";
    }
}
