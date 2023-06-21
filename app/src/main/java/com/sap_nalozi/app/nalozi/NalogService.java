package com.sap_nalozi.app.nalozi;

import com.sap_nalozi.app.nalozi.Nalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NalogService {
    private final NalogRepository nalogRepository;
    @Autowired
    public NalogService(NalogRepository nalogRepository){
        this.nalogRepository = nalogRepository;
    }

    public List<Nalog> sviNalozi() {
        return nalogRepository.findAll();
    }

    public void kreirajNalog(Nalog nalog) {
        nalogRepository.save(nalog);
    }

    public List<Nalog> naloziPoMapaID(Long mapaId) {
        return nalogRepository.naloziPoMapID(mapaId);
    }

    public void updateStatus(Long id) {
        nalogRepository.findById(id).map(nalog -> {
            nalog.setStatus(true);
            nalog.setDatumZavrsetka(new Date());
            return nalogRepository.save(nalog);
        });
    }

    public void deleteNalog(Long id) {
        nalogRepository.deleteById(id);
    }
}
