package com.launchacademy.reviews.models;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Getter
@Setter
@Component
public class ReviewForm {

  private Long siteId;

  @NotBlank(message = "can't be blank")
  private String username;

  @NotNull(message = "must be provided")
  @Min(1)
  @Max(5)
  private Integer rating;

  private String comment;

}
