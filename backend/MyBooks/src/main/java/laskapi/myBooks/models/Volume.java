package laskapi.myBooks.models;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

//@Data
@NoArgsConstructor
//@AllArgsConstructor
@Entity
public class Volume {
    @Id
    @Basic(optional = false)
//    @GeneratedValue(strategy = GenerationType.AUTO)
    public String id;
    @Column(length = 2048)
    public String title;
    @Column(columnDefinition = "text")
    public String description;
    @Column(length = 2048)
    public String publisher;
    public String publishedDate;
    public String pdf;
    public List<String> authors= new ArrayList<>();
    public List<String> thumbnails= new ArrayList<>();




    public Volume(JsonNode fullNode) {

        id=fullNode.path("id").asText();

        JsonNode volumeNode=fullNode.path("volumeInfo");
        title=volumeNode.path("title").asText();
        description=volumeNode.path("description").asText();
        publisher=volumeNode.path("publisher").asText();
        publishedDate=volumeNode.path("publishedDate").asText();
        pdf=fullNode.path("accessInfo").path("pdf").path("downloadLink").asText();
        volumeNode.path("authors").elements().forEachRemaining(a->authors.add(a.asText()));
        volumeNode.path("imageLinks").elements().forEachRemaining(t->thumbnails.add(t.asText()));


    }
}
