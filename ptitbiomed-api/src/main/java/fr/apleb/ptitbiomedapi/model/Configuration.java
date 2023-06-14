package fr.apleb.ptitbiomedapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Setter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PROTECTED)
@Builder
@Entity
@Table(name = "CONFIGURATION_CFG")
public class Configuration {

    @Id
    @Column(name = "CFG_ID")
    private Integer id;

    @Column(name = "CFG_LOGO_URL")
    private String logoUrl;

    @Column(name = "CFG_FOOTER")
    private String footer;

    @Column(name = "CFG_FAVICON_URL")
    private String faviconUrl;

}
