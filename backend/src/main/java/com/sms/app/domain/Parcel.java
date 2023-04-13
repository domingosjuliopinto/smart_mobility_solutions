package com.sms.app.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Parcel.
 */
@Entity
@Table(name = "parcel")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Parcel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "sender_name", nullable = false)
    private String sender_name;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    @Column(name = "sender_email", nullable = false)
    private String sender_email;

    @NotNull
    @Column(name = "sender_address", nullable = false)
    private String sender_address;

    @NotNull
    @Size(min = 8, max = 15)
    @Pattern(regexp = "[0-9]+")
    @Column(name = "sender_phone_no", length = 15, nullable = false)
    private String sender_phone_no;

    @NotNull
    @Column(name = "receiver_name", nullable = false)
    private String receiver_name;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
    @Column(name = "receiver_email", nullable = false)
    private String receiver_email;

    @NotNull
    @Column(name = "receiver_address", nullable = false)
    private String receiver_address;

    @NotNull
    @Size(min = 8, max = 15)
    @Pattern(regexp = "[0-9]+")
    @Column(name = "receiver_phone_no", length = 15, nullable = false)
    private String receiver_phone_no;

    @NotNull
    @Column(name = "parcel_name", nullable = false)
    private String parcel_name;

    @NotNull
    @Column(name = "parcel_type", nullable = false)
    private String parcel_type;

    @NotNull
    @Column(name = "parcel_weight_in_kg", nullable = false)
    private Float parcel_weight_in_kg;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Parcel id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender_name() {
        return this.sender_name;
    }

    public Parcel sender_name(String sender_name) {
        this.setSender_name(sender_name);
        return this;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public String getSender_email() {
        return this.sender_email;
    }

    public Parcel sender_email(String sender_email) {
        this.setSender_email(sender_email);
        return this;
    }

    public void setSender_email(String sender_email) {
        this.sender_email = sender_email;
    }

    public String getSender_address() {
        return this.sender_address;
    }

    public Parcel sender_address(String sender_address) {
        this.setSender_address(sender_address);
        return this;
    }

    public void setSender_address(String sender_address) {
        this.sender_address = sender_address;
    }

    public String getSender_phone_no() {
        return this.sender_phone_no;
    }

    public Parcel sender_phone_no(String sender_phone_no) {
        this.setSender_phone_no(sender_phone_no);
        return this;
    }

    public void setSender_phone_no(String sender_phone_no) {
        this.sender_phone_no = sender_phone_no;
    }

    public String getReceiver_name() {
        return this.receiver_name;
    }

    public Parcel receiver_name(String receiver_name) {
        this.setReceiver_name(receiver_name);
        return this;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getReceiver_email() {
        return this.receiver_email;
    }

    public Parcel receiver_email(String receiver_email) {
        this.setReceiver_email(receiver_email);
        return this;
    }

    public void setReceiver_email(String receiver_email) {
        this.receiver_email = receiver_email;
    }

    public String getReceiver_address() {
        return this.receiver_address;
    }

    public Parcel receiver_address(String receiver_address) {
        this.setReceiver_address(receiver_address);
        return this;
    }

    public void setReceiver_address(String receiver_address) {
        this.receiver_address = receiver_address;
    }

    public String getReceiver_phone_no() {
        return this.receiver_phone_no;
    }

    public Parcel receiver_phone_no(String receiver_phone_no) {
        this.setReceiver_phone_no(receiver_phone_no);
        return this;
    }

    public void setReceiver_phone_no(String receiver_phone_no) {
        this.receiver_phone_no = receiver_phone_no;
    }

    public String getParcel_name() {
        return this.parcel_name;
    }

    public Parcel parcel_name(String parcel_name) {
        this.setParcel_name(parcel_name);
        return this;
    }

    public void setParcel_name(String parcel_name) {
        this.parcel_name = parcel_name;
    }

    public String getParcel_type() {
        return this.parcel_type;
    }

    public Parcel parcel_type(String parcel_type) {
        this.setParcel_type(parcel_type);
        return this;
    }

    public void setParcel_type(String parcel_type) {
        this.parcel_type = parcel_type;
    }

    public Float getParcel_weight_in_kg() {
        return this.parcel_weight_in_kg;
    }

    public Parcel parcel_weight_in_kg(Float parcel_weight_in_kg) {
        this.setParcel_weight_in_kg(parcel_weight_in_kg);
        return this;
    }

    public void setParcel_weight_in_kg(Float parcel_weight_in_kg) {
        this.parcel_weight_in_kg = parcel_weight_in_kg;
    }

    public String getStatus() {
        return this.status;
    }

    public Parcel status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parcel)) {
            return false;
        }
        return id != null && id.equals(((Parcel) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parcel{" +
            "id=" + getId() +
            ", sender_name='" + getSender_name() + "'" +
            ", sender_email='" + getSender_email() + "'" +
            ", sender_address='" + getSender_address() + "'" +
            ", sender_phone_no='" + getSender_phone_no() + "'" +
            ", receiver_name='" + getReceiver_name() + "'" +
            ", receiver_email='" + getReceiver_email() + "'" +
            ", receiver_address='" + getReceiver_address() + "'" +
            ", receiver_phone_no='" + getReceiver_phone_no() + "'" +
            ", parcel_name='" + getParcel_name() + "'" +
            ", parcel_type='" + getParcel_type() + "'" +
            ", parcel_weight_in_kg=" + getParcel_weight_in_kg() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
