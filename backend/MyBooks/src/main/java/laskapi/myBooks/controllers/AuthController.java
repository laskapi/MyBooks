package laskapi.myBooks.controllers;

import laskapi.myBooks.models.User;
import laskapi.myBooks.repositories.UserRepository;
import laskapi.myBooks.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtService jwtService;


    public record UserDto (String username, String accessToken){}


    @PostMapping("/login")
    public ResponseEntity<UserDto> authenticateUser(@RequestBody User user) {
    try {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token=jwtService.generateToken(userDetails.getUsername());
        return ResponseEntity.ok().body(new UserDto(userDetails.getUsername()
                ,token)/*Collections.singletonMap("accessToken",token)*/);

    }catch(AuthenticationException e){
        return ResponseEntity.notFound().build();
    }



    }
    @PostMapping(value = "/register")
    public ResponseEntity<Map<String,String>> registerUser(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
               return ResponseEntity.badRequest().body(Collections.singletonMap("message",
                    "User is already taken!"));

        }
        // Create new user's account
        User newUser = new User(
                null,
                user.getUsername(),
                user.getPassword(),
                encoder.encode(user.getPassword())
        );
        userRepository.save(newUser);

      return ResponseEntity.ok().body(Collections.singletonMap("message",
                "User registered " +
                        "successfully!"));
    }
}
