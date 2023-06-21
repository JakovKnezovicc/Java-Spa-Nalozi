package com.sap_nalozi.app.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String ime;
    private String prezime;
    private String lozinka;
    private String korisnickoIme;

}
