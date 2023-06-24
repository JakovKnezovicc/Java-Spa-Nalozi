package com.sap_nalozi.app.korisnik;
import com.sap_nalozi.app.mape.MapaRepository;
import com.sap_nalozi.app.nalozi.NalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikService {
    private final KorisnikRepository korisnikRepository;
    private final MapaRepository mapaRepository;
    private final NalogRepository nalogRepository;

    @Autowired
    public KorisnikService(KorisnikRepository korisnikRepository, MapaRepository mapaRepository, NalogRepository nalogRepository) {
        this.korisnikRepository = korisnikRepository;
        this.mapaRepository = mapaRepository;
        this.nalogRepository = nalogRepository;
    }
    public List<Korisnik> korisnici() {
        return korisnikRepository.findAll();
    }

    public void dodajKorisnika(Korisnik korisnik) {
        Optional<Korisnik> korisnickoIme = korisnikRepository.pronadjiKorisnikaPoImenu(korisnik.getKorisnickoIme());
        System.out.println("Kor ime: " + korisnickoIme);
        if(korisnickoIme.isPresent()) {
            throw new IllegalStateException("Korisnicko ime zauzeto");
        }
        korisnikRepository.save(korisnik);
    }

    public Long korisnikId(String korisnickoIme) {
        Optional<Korisnik> korisnik = korisnikRepository.pronadjiKorisnikaPoImenu(korisnickoIme);
        if(!korisnik.isPresent()) {
            throw  new IllegalStateException("Korisnik ne postoji");
        }

        return korisnik.get().getId();
    }

    public void izbrisiKorisnika(Long id) {
        nalogRepository.izbrisiNalogPoKorisnikId(id);
        mapaRepository.izbrisiMapePoKorisnikId(id);
        korisnikRepository.deleteById(id);
    }
}
