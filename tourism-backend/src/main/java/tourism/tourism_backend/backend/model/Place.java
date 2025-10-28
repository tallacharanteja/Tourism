package tourism.tourism_backend.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "places")
public class Place {
    @Id
    private String id;
    private String name;
    private String location;
    private String description;
    private Double price;
    private String imageUrl;
}
