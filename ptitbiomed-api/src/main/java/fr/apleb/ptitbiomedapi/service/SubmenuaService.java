package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.Submenua;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenuaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmenuaService {
    private final SubmenuaRepository submenuaRepository;

    public SubmenuaService(SubmenuaRepository submenuaRepository) {
        this.submenuaRepository = submenuaRepository;
    }

    public List<Submenua> getSubmenuaByParent(int idParent) {
        return this.submenuaRepository.findByIdParent(idParent);
    }
}
