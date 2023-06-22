package com.sap_nalozi.app.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/korisnici")
public class KorisnikController {
    private final KorisnikService korisnikService;

    @Autowired
    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @GetMapping( value = "/svi")
    public List<Korisnik> korisnici() {
        return korisnikService.korisnici();
    }

    @GetMapping(value = "/{ime}")
    public Long korisnikId(@PathVariable String ime) {
        System.out.println("Korisnikovo ime: " + ime);
        return korisnikService.korisnikId(ime);
    }
    @PostMapping(value = "/novi")
    public void registrirajKorisnika(@RequestBody Korisnik korisnik) {
        korisnikService.dodajKorisnika(korisnik);
    }

    @PostMapping(value = "/izbrisi/{id}")
    public void izbrisiKorisnika(@RequestBody Long id) {
        korisnikService.izbrisiKorisnika(id);
    }
}
