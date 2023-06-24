package com.sap_nalozi.app.nalozi;

import com.sap_nalozi.app.mape.Mapa;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NalogRepository extends JpaRepository<Nalog, Long> {
    @Query(value = "SELECT * FROM nalog WHERE mapa_id = ?1",
    nativeQuery = true)
    List<Nalog> naloziPoMapID(Long mapaId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM nalog WHERE korisnik_id = ?1", nativeQuery = true)
    void izbrisiNalogPoKorisnikId(Long id);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM nalog WHERE mapa_id = ?1", nativeQuery = true)
    void izbrisiNalogPoMapaId(Long id);
}
