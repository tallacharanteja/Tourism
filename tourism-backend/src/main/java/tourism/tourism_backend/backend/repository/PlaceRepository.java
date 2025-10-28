package tourism.tourism_backend.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import tourism.tourism_backend.backend.model.Place;

public interface PlaceRepository extends MongoRepository<Place, String> {
}
