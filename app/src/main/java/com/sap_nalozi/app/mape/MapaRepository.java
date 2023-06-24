package com.sap_nalozi.app.mape;

import com.sap_nalozi.app.korisnik.Korisnik;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MapaRepository extends JpaRepository<Mapa, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM mapa WHERE korisnik_id = ?1",
            nativeQuery = true)
    void izbrisiMapePoKorisnikId(Long id);
}
