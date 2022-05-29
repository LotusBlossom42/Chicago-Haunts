package com.launchacademy.reviews.models;

import java.util.List;
import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import org.hibernate.validator.constraints.URL;
import java.util.Set;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "haunted_sites")
public class HauntedSite {

  @Id
  @SequenceGenerator(name = "haunted_site_generator", sequenceName = "haunted_sites_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "haunted_site_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Long id;

  @NotBlank(message = "cannot be blank")
  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description")
  private String description;

  @NotBlank(message = "cannot be blank")
  @URL(message = "Image must have a valid URL")
  @Column(name = "img_url", nullable = false)
  private String imgUrl;

  @NotBlank(message = "cannot be blank")
  @URL(message = "Website must have a valid URL")
  @Column(name = "website_url", nullable = false)
  private String websiteUrl;

  @Column(name = "coordinates")
  private String coordinates;

  @OneToMany(mappedBy = "hauntedSite", orphanRemoval = true)
  @JsonIgnoreProperties("hauntedSite")
  private List<Review> reviews;


}


