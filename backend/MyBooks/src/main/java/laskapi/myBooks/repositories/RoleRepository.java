package laskapi.myBooks.repositories;

import laskapi.myBooks.models.ERole;
import laskapi.myBooks.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByName(ERole name);

}
