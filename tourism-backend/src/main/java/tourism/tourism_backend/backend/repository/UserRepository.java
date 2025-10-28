package tourism.tourism_backend.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import tourism.tourism_backend.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
