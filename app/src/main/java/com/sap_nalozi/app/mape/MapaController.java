package com.sap_nalozi.app.mape;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/mape")
public class MapaController {
    private final MapaService mapaService;

    @Autowired
    public MapaController(MapaService mapaService) {
        this.mapaService = mapaService;
    }

    @GetMapping( value = "/svi")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Mapa> sveMape() {
        return mapaService.sveMape();
    }
    @PostMapping(value = "/novi")
    @CrossOrigin(origins = "http://localhost:3000")
    public void kreirajMapu(@RequestBody Mapa mapa) {
        mapaService.kreirajMapu(mapa);
    }
    @PostMapping(value = "/izbrisi/{id}")
    public void izbrisiMapu(@PathVariable Long id) {
        mapaService.izbrisiMapu(id);
    }
}
