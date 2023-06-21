package com.sap_nalozi.app.korisnik;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Long> {
    @Query(value = "SELECT * FROM korisnik WHERE korisnicko_ime = ?1",
    nativeQuery = true)
    Optional<Korisnik> pronadjiKorisnikaPoImenu(String korisnickoIme);

}
