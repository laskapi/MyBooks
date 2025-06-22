package laskapi.myBooks.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

public class HomeController {

    @RestController
    @RequestMapping("/api/test")
    public class TestController {
        @GetMapping("/all")
        public String allAccess() {
            return "Public Content.";
        }
        @GetMapping("/user")
        public String userAccess() {
            return "User Content.";
        }
    }
}
