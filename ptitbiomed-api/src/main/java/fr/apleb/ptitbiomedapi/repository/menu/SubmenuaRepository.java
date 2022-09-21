package fr.apleb.ptitbiomedapi.repository.menu;

import fr.apleb.ptitbiomedapi.model.menu.Submenua;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmenuaRepository extends JpaRepository<Submenua, Integer> {
	List<Submenua> findByIdParent(Integer idParent);

	Submenua findByIdAndIdParent(Integer id, Integer idParent);

	int countByIdParent(Integer idParent);
}
