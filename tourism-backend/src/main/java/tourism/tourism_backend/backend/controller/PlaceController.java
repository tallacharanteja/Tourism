package tourism.tourism_backend.backend.controller;

import tourism.tourism_backend.backend.model.Place;
import tourism.tourism_backend.backend.repository.PlaceRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    @Autowired
    private PlaceRepository repository;

    @GetMapping
    public List<Place> getAllPlaces() {
        return repository.findAll();
    }

    @PostMapping
    public Place addPlace(@RequestBody Place place) {
        return repository.save(place);
    }

    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable String id, @RequestBody Place updatedPlace) {
        updatedPlace.setId(id);
        return repository.save(updatedPlace);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable String id) {
        repository.deleteById(id);
    }
}
