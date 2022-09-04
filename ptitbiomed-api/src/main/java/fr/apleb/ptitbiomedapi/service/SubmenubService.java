package fr.apleb.ptitbiomedapi.service;

import fr.apleb.ptitbiomedapi.model.menu.Submenub;
import fr.apleb.ptitbiomedapi.repository.menu.SubmenubRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmenubService {
    private final SubmenubRepository submenubRepository;

    public SubmenubService(SubmenubRepository submenubRepository) {
        this.submenubRepository = submenubRepository;
    }

    public List<Submenub> getSubmenubByParent(int idParent) {
        return this.submenubRepository.findByIdParent(idParent);
    }
}
