package com.sap_nalozi.app.mape;

import com.sap_nalozi.app.korisnik.Korisnik;
import com.sap_nalozi.app.korisnik.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class MapaService {
    private final MapaRepository mapaRepository;

    @Autowired
    public MapaService(MapaRepository mapaRepository) {
        this.mapaRepository = mapaRepository;
    }
    public List<Mapa> sveMape() {
        return mapaRepository.findAll();
    }

    public void kreirajMapu(Mapa mapa) {
        mapa.setDatumKreiranja(new Date());
        mapaRepository.save(mapa);
    }
}
