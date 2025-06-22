package laskapi.myBooks.models;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class Volume {

    public String id;
    public String title;
    public String description;
    public String publisher;
    public String publishedDate;
    public List<String> authors= new ArrayList<>();
    public List<String> thumbnails= new ArrayList<>();




    public Volume(JsonNode fullNode) {

        id=fullNode.path("id").asText();

        JsonNode volumeNode=fullNode.path("volumeInfo");
        title=volumeNode.path("title").asText();
        description=volumeNode.path("description").asText();
        publisher=volumeNode.path("publisher").asText();
        publishedDate=volumeNode.path("publishedDate").asText();

        volumeNode.path("authors").elements().forEachRemaining(a->authors.add(a.asText()));
        volumeNode.path("imageLinks").elements().forEachRemaining(t->thumbnails.add(t.asText()));


    }
}
