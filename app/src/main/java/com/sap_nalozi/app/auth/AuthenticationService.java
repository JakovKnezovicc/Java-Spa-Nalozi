package com.sap_nalozi.app.auth;

import com.sap_nalozi.app.config.JwtService;
import com.sap_nalozi.app.korisnik.Korisnik;
import com.sap_nalozi.app.korisnik.KorisnikRepository;
import com.sap_nalozi.app.korisnik.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService{
    private final KorisnikRepository korisnikRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = Korisnik.builder()
                .ime(request.getIme())
                .prezime(request.getPrezime())
                .korisnickoIme(request.getKorisnickoIme())
                .lozinka(passwordEncoder.encode(request.getLozinka()))
                .role(Role.USER)
                .build();

        korisnikRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println(request.getKorisnickoIme());
        System.out.println(request.getLozinka());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getKorisnickoIme(), request.getLozinka())
        );
        var user = korisnikRepository.pronadjiKorisnikaPoImenu(request.getKorisnickoIme()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
