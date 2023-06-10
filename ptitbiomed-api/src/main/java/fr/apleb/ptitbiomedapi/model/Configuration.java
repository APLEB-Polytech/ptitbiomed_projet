package fr.apleb.ptitbiomedapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import static lombok.AccessLevel.PRIVATE;

@Getter
@Setter
@AllArgsConstructor(access = PRIVATE)
@Builder
@Entity
@Table(name = "CONFIGURATION_CFG")
public class Configuration {

    protected Configuration() {}

    @Id
    @Column(name = "CFG_ID")
    private final Integer id = 1;

    @Column(name = "CFG_LOGO_URL")
    private String logoUrl;

    @Column(name = "CFG_FOOTER")
    private String footer;

}
