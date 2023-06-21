package com.sap_nalozi.app.nalozi;

import com.sap_nalozi.app.korisnik.Korisnik;
import com.sap_nalozi.app.korisnik.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/nalozi")
public class NalogController {
    private final NalogService nalogService;


    @Autowired
    public NalogController(NalogService nalogService) {
        this.nalogService = nalogService;
    }

    @GetMapping( value = "/svi")
    public List<Nalog> sviNalozi() {
        return nalogService.sviNalozi();
    }
    @PostMapping(value = "/novi")
    public void kreirajNalog(@RequestBody Nalog nalog) {
        nalogService.kreirajNalog(nalog);
    }
    @GetMapping(value = "/mapa")
    @ResponseBody
    public List<Nalog> naloziPoMapaID(@RequestParam Long mapaId) {
        System.out.println("Pozvan sam nalozipomadaada");
        return nalogService.naloziPoMapaID(mapaId);
    }

    @PutMapping(value = "/status/{id}")
    public void updateStatus(@PathVariable Long id) {
        nalogService.updateStatus(id);
    }

    @DeleteMapping(value = "/izbrisi/{id}")
    public void deleteNalog(@PathVariable Long id) {
        nalogService.deleteNalog(id);
    }
}
