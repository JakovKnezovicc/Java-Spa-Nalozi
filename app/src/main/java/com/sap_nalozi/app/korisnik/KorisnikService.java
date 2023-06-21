package com.sap_nalozi.app.korisnik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikService {
    private final KorisnikRepository korisnikRepository;

    @Autowired
    public KorisnikService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
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
        System.out.println("hohohohohoho");
        korisnikRepository.save(korisnik);
    }

    public Long korisnikId(String korisnickoIme) {
        Optional<Korisnik> korisnik = korisnikRepository.pronadjiKorisnikaPoImenu(korisnickoIme);
        if(!korisnik.isPresent()) {
            throw  new IllegalStateException("Korisnik ne postoji");
        }

        return korisnik.get().getId();
    }
}
