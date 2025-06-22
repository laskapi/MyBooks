package laskapi.myBooks.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    private final String searchUrl = "https://www.googleapis.com/books/v1/volumes";


    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .baseUrl(searchUrl)
                .build();
    }
}
