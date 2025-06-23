package laskapi.myBooks.repositories;

import laskapi.myBooks.models.Volume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Volume,String> {

}
