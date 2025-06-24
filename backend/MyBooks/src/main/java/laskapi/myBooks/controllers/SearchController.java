package laskapi.myBooks.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import laskapi.myBooks.models.Volume;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

import java.io.Console;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static org.springframework.http.ResponseEntity.ok;

@Log4j2
@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final RestClient restClient;

    @Autowired
    public SearchController(RestClient restClient) {
        this.restClient = restClient;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Volume>> searchByTitle(@RequestParam String query, @RequestParam int page)
            throws JsonProcessingException {
        int index=page*5;
        JsonNode response = restClient.get().uri("?q=intitle:" + query +
                        "&projection" +
                        "=lite&maxResults=5&startIndex=" + index)
                .retrieve().body(JsonNode.class);

        JsonNode items = response.path("items");
        Stream<JsonNode> stream =
                StreamSupport.stream(items.spliterator(), false);

    /*    stream.forEach(i -> log.info(i.path("volumeInfo").path("title")
           .asText()));*/

        List volumes = stream.map(i -> new Volume(i)).toList();
        log.info("Volumes read: " + volumes.size());
        return ResponseEntity.ok().body(volumes);
    }
}
