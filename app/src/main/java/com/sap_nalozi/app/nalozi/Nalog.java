package com.sap_nalozi.app.nalozi;

import com.sap_nalozi.app.korisnik.Korisnik;
import com.sap_nalozi.app.mape.Mapa;
import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table
public class Nalog {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private long id;
    @Column(nullable = false)
    private String ime;
    @Column(nullable = false)
    private Boolean status = false;
    @Column(nullable = false)
    private Date datumPocetka = new Date();
    @Column
    private Date datumZavrsetka;
    @ManyToOne(cascade=CascadeType.MERGE)
    private Korisnik korisnik;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Mapa mapa;

    public Nalog() {
    }

    public Nalog(long id, String ime, Boolean status, Date datumPocetka, Date datumZavrsetka, Korisnik korisnik, Mapa mapa) {
        this.id = id;
        this.ime = ime;
        this.status = status;
        this.datumPocetka = datumPocetka;
        this.datumZavrsetka = datumZavrsetka;
        this.korisnik = korisnik;
        this.mapa = mapa;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Date getDatumPocetka() {
        return datumPocetka;
    }

    public void setDatumPocetka(Date datumPocetka) {
        this.datumPocetka = datumPocetka;
    }

    public Date getDatumZavrsetka() {
        return datumZavrsetka;
    }

    public void setDatumZavrsetka(Date datumZavrsetka) {
        this.datumZavrsetka = datumZavrsetka;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }
    public Mapa getMapa() {
        return mapa;
    }

    public void setMapa(Mapa mapa) {
        this.mapa = mapa;
    }

    public Nalog(String ime, Boolean status, Date datumPocetka, Date datumZavrsetka, Korisnik korisnik, Mapa mapa) {
        this.ime = ime;
        this.status = status;
        this.datumPocetka = datumPocetka;
        this.datumZavrsetka = datumZavrsetka;
        this.korisnik = korisnik;
        this.mapa = mapa;
    }
}
