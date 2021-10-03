package com.example.test.vision;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] image;
    @ElementCollection
    private List <String> objects;

    public Image(){};

    public Image(Long id, byte[] image, List<String> objects) {
        this.id = id;
        this.image = image;
        this.objects = objects;
    }

    public Image(byte[] image, List<String> objects) {
        this.image = image;
        this.objects = objects;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<String> getObjects() {
        return objects;
    }

    public void setObjects(List<String> objects) {
        this.objects = objects;
    }


    @Override
    public String toString() {
        return id.toString()+" "+objects;
    }
}
