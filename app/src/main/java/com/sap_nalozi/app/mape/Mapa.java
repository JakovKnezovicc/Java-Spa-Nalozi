package com.sap_nalozi.app.mape;

import com.sap_nalozi.app.korisnik.Korisnik;
import jakarta.persistence.*;
import com.sap_nalozi.app.nalozi.Nalog;

import java.util.Date;
import java.util.Set;
@Entity
@Table
public class Mapa {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(nullable = false)
    private String naziv;

    private Date datumKreiranja;
    @Column(nullable = false)
    private String poduzece;

    @ManyToOne(cascade=CascadeType.MERGE)
    private Korisnik korisnik;

    public Mapa() {
    }

    public Mapa(String naziv, Date datumKreiranja, String poduzece, Korisnik korisnik) {
        this.naziv = naziv;
        this.datumKreiranja = datumKreiranja;
        this.poduzece = poduzece;
        this.korisnik = korisnik;
    }

    public Mapa(Long id, String naziv, Date datumKreiranja, String poduzece, Korisnik korisnik) {
        this.id = id;
        this.naziv = naziv;
        this.datumKreiranja = datumKreiranja;
        this.poduzece = poduzece;
        this.korisnik = korisnik;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Date getDatumKreiranja() {
        return datumKreiranja;
    }

    public void setDatumKreiranja(Date datumKreiranja) {
        this.datumKreiranja = datumKreiranja;
    }

    public String getPoduzece() {
        return poduzece;
    }

    public void setPoduzece(String poduzece) {
        this.poduzece = poduzece;
    }

    public Korisnik getKorisnik() {return korisnik;}
    public void setKorisnik(Korisnik korisnik) {this.korisnik = korisnik;}
}
