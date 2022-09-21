package fr.apleb.ptitbiomedapi.repository.menu;

import fr.apleb.ptitbiomedapi.model.menu.Submenub;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmenubRepository extends JpaRepository<Submenub, Integer> {
    List<Submenub> findByIdParent(Integer idParent);

    int countByIdParent(Integer idParent);
}
