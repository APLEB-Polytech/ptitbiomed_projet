package fr.apleb.ptitbiomedapi.repository.user;

import fr.apleb.ptitbiomedapi.model.user.ERole;
import fr.apleb.ptitbiomedapi.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}