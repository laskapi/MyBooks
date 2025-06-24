package laskapi.myBooks.controllers;

import laskapi.myBooks.models.Volume;
import laskapi.myBooks.repositories.LibraryRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/library")
public class LibraryController {

    @Autowired
    LibraryRepository libraryRepository;

    @ExceptionHandler
    public ResponseEntity<Object> handleException(Exception e) {
        log.error(e.getMessage());
        return ResponseEntity.badRequest().build();

    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> exists(@RequestParam String id) {
        boolean exists = libraryRepository.existsById(id);
        log.info("exists: {}", exists);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/add")
    public ResponseEntity<Volume> add(@RequestBody Volume volume) {
        log.info("added volume {}", volume.title);
        return ResponseEntity.ok(libraryRepository.save(volume));
    }

    @GetMapping("/get/{index}")
    public ResponseEntity<List<Volume>> getPage(@PathVariable int index) {

        Pageable page= PageRequest.of(index,5);
        return ResponseEntity.ok().body(libraryRepository.findAll(page).stream().toList());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id) {
        libraryRepository.deleteById(id);
        return ResponseEntity.ok(id);
    }
}
