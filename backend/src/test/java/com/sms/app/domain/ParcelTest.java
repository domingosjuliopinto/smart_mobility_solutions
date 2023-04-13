package com.sms.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.sms.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParcelTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parcel.class);
        Parcel parcel1 = new Parcel();
        parcel1.setId(1L);
        Parcel parcel2 = new Parcel();
        parcel2.setId(parcel1.getId());
        assertThat(parcel1).isEqualTo(parcel2);
        parcel2.setId(2L);
        assertThat(parcel1).isNotEqualTo(parcel2);
        parcel1.setId(null);
        assertThat(parcel1).isNotEqualTo(parcel2);
    }
}
