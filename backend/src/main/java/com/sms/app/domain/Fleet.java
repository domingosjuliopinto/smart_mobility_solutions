package com.sms.app.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Fleet.
 */
@Entity
@Table(name = "fleet")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Fleet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "driver_name", nullable = false)
    private String driver_name;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    @Column(name = "driver_email", nullable = false)
    private String driver_email;

    @NotNull
    @Column(name = "driver_address", nullable = false)
    private String driver_address;

    @NotNull
    @Size(min = 8, max = 15)
    @Pattern(regexp = "[0-9]+")
    @Column(name = "driver_phone_no", length = 15, nullable = false)
    private String driver_phone_no;

    @Column(name = "vehicle_plate_no", unique = true)
    private String vehicle_plate_no;

    @NotNull
    @Column(name = "vehicle_type", nullable = false)
    private String vehicle_type;

    @NotNull
    @Column(name = "vehicle_status", nullable = false)
    private String vehicle_status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Fleet id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDriver_name() {
        return this.driver_name;
    }

    public Fleet driver_name(String driver_name) {
        this.setDriver_name(driver_name);
        return this;
    }

    public void setDriver_name(String driver_name) {
        this.driver_name = driver_name;
    }

    public String getDriver_email() {
        return this.driver_email;
    }

    public Fleet driver_email(String driver_email) {
        this.setDriver_email(driver_email);
        return this;
    }

    public void setDriver_email(String driver_email) {
        this.driver_email = driver_email;
    }

    public String getDriver_address() {
        return this.driver_address;
    }

    public Fleet driver_address(String driver_address) {
        this.setDriver_address(driver_address);
        return this;
    }

    public void setDriver_address(String driver_address) {
        this.driver_address = driver_address;
    }

    public String getDriver_phone_no() {
        return this.driver_phone_no;
    }

    public Fleet driver_phone_no(String driver_phone_no) {
        this.setDriver_phone_no(driver_phone_no);
        return this;
    }

    public void setDriver_phone_no(String driver_phone_no) {
        this.driver_phone_no = driver_phone_no;
    }

    public String getVehicle_plate_no() {
        return this.vehicle_plate_no;
    }

    public Fleet vehicle_plate_no(String vehicle_plate_no) {
        this.setVehicle_plate_no(vehicle_plate_no);
        return this;
    }

    public void setVehicle_plate_no(String vehicle_plate_no) {
        this.vehicle_plate_no = vehicle_plate_no;
    }

    public String getVehicle_type() {
        return this.vehicle_type;
    }

    public Fleet vehicle_type(String vehicle_type) {
        this.setVehicle_type(vehicle_type);
        return this;
    }

    public void setVehicle_type(String vehicle_type) {
        this.vehicle_type = vehicle_type;
    }

    public String getVehicle_status() {
        return this.vehicle_status;
    }

    public Fleet vehicle_status(String vehicle_status) {
        this.setVehicle_status(vehicle_status);
        return this;
    }

    public void setVehicle_status(String vehicle_status) {
        this.vehicle_status = vehicle_status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fleet)) {
            return false;
        }
        return id != null && id.equals(((Fleet) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fleet{" +
            "id=" + getId() +
            ", driver_name='" + getDriver_name() + "'" +
            ", driver_email='" + getDriver_email() + "'" +
            ", driver_address='" + getDriver_address() + "'" +
            ", driver_phone_no='" + getDriver_phone_no() + "'" +
            ", vehicle_plate_no='" + getVehicle_plate_no() + "'" +
            ", vehicle_type='" + getVehicle_type() + "'" +
            ", vehicle_status='" + getVehicle_status() + "'" +
            "}";
    }
}
