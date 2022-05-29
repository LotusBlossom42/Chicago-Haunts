package com.launchacademy.reviews.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reviews")
public class Review {

  @Id
  @SequenceGenerator(name = "review_generator", sequenceName = "reviews_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Long id;

  @NotBlank(message = "can't be blank")
  @Column(name = "username")
  private String username;

  @NotNull(message = "must be provided")
  @Min(1)
  @Max(5)
  @Column(name = "rating", nullable = false)
  private Integer rating;

  @Column(name = "comment")
  private String comment;

  @ManyToOne
  @JoinColumn(name = "haunted_site_id", nullable = false)
  @JsonIgnoreProperties("reviews")
  private HauntedSite hauntedSite;
}
