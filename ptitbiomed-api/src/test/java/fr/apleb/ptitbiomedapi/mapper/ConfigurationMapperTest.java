package fr.apleb.ptitbiomedapi.mapper;

import fr.apleb.ptitbiomedapi.dto.ConfigurationDto;
import fr.apleb.ptitbiomedapi.model.Configuration;
import fr.apleb.ptitbiomedapi.testutils.UnitTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.params.provider.Arguments.arguments;

/**
 * Test class for {@link ConfigurationMapper}.
 */
class ConfigurationMapperTest implements UnitTest {

    @InjectMocks
    private ConfigurationMapperImpl mapper;

    @Test
    void test_Map_Configuration_to_DTO() {
        final String FAVICON_URL = "FAVICON URL";
        final String FOOTER = "FOOTER";
        final String LOGO_URL = "LOGO URL";

        final Configuration ENTITY = Configuration.builder()
            .faviconUrl(FAVICON_URL)
            .footer(FOOTER)
            .logoUrl(LOGO_URL)
            .build();

        final ConfigurationDto dto = mapper.map(ENTITY);

        assertEquals(FAVICON_URL, dto.faviconUrl());
        assertEquals(FOOTER, dto.footer());
        assertEquals(LOGO_URL, dto.logoUrl());
    }

    @ParameterizedTest
    @MethodSource("providePatches")
    void test_Patch_entity(ConfigurationDto patch) {
        final int ID = 1564;
        final String PREVIOUS_FAVICON_URL = "PREVIOUS FAVICON URL";
        final String PREVIOUS_FOOTER = "PREVIOUS FOOTER";
        final String PREVIOUS_LOGO_URL = "PREVIOUS LOGO URL";

        final Configuration ENTITY = Configuration.builder()
            .id(ID)
            .faviconUrl(PREVIOUS_FAVICON_URL)
            .footer(PREVIOUS_FOOTER)
            .logoUrl(PREVIOUS_LOGO_URL)
            .build();

        final Configuration patchedEntity = mapper.patch(ENTITY, patch);

        assertSame(ENTITY, patchedEntity);
        assertEquals(ID, patchedEntity.getId());
        assertPatchedValue(PREVIOUS_FAVICON_URL, patch.faviconUrl(), patchedEntity.getFaviconUrl());
        assertPatchedValue(PREVIOUS_FOOTER, patch.footer(), patchedEntity.getFooter());
        assertPatchedValue(PREVIOUS_LOGO_URL, patch.logoUrl(), patchedEntity.getLogoUrl());
    }

    private static Stream<Arguments> providePatches() {
        return Stream.of(
            arguments(ConfigurationDto.builder().build()),
            arguments(ConfigurationDto.builder().faviconUrl("NEW FAVICON URL").build()),
            arguments(ConfigurationDto.builder().footer("NEW FOOTER").build()),
            arguments(ConfigurationDto.builder().logoUrl("NEW LOGO URL").build()),
            arguments(ConfigurationDto.builder()
                .faviconUrl("NEW FAVICON URL")
                .footer("NEW FOOTER")
                .logoUrl("NEW LOGO URL")
                .build())
        );
    }

    private static void assertPatchedValue(Object previous, Object patchValue, Object actual) {
        assertEquals(patchValue == null ? previous : patchValue, actual);
    }

}
