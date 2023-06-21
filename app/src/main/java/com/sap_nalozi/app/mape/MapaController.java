package com.sap_nalozi.app.mape;

import com.sap_nalozi.app.nalozi.Nalog;
import com.sap_nalozi.app.nalozi.NalogService;
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
}
