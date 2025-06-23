package laskapi.myBooks.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import laskapi.myBooks.models.Volume;
import laskapi.myBooks.repositories.LibraryRepository;
import laskapi.myBooks.repositories.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/library")
public class LibraryController {

    @Autowired
    LibraryRepository libraryRepository;

    @GetMapping("/exists")
    public ResponseEntity<Boolean> exists(@RequestParam String id) {
        boolean exists=libraryRepository.existsById(id);
        log.info("exists: {}", exists);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/add")
    public ResponseEntity<Volume> add(@RequestBody Volume volume){
        log.info("added volume {}",volume.title);

        try {

            return ResponseEntity.ok(libraryRepository.save(volume));

        }catch(Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
       }

       @GetMapping("/get")
    public ResponseEntity<List<Volume>> getAll(){
        try{
            return ResponseEntity.ok().body(libraryRepository.findAll());
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
       }
        @DeleteMapping("/delete")
    public ResponseEntity<Volume> delete(@RequestBody Volume volume){
        
        return ResponseEntity.ok(volume);
        }
}
