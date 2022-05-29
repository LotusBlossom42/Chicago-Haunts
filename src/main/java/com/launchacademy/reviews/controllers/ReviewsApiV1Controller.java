package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandling.ReviewNotCreatedException;
import com.launchacademy.reviews.exceptionHandling.ReviewNotFoundException;
import com.launchacademy.reviews.exceptionHandling.ReviewNotUpdatedException;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.models.ReviewForm;
import com.launchacademy.reviews.services.ReviewService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewsApiV1Controller {

  private ReviewService reviewService;

  @Autowired
  public ReviewsApiV1Controller(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @PostMapping
  public ResponseEntity createReview(@RequestBody @Valid ReviewForm reviewForm,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      Map<String, String> errorList = new HashMap<>();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        errorList.put(fieldError.getField(), fieldError.getDefaultMessage());
      }
      Map<String, Map> errors = new HashMap<>();
      errors.put("errors", errorList);
      return new ResponseEntity<Map<String, Map>>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      Map<String, Review> dataMap = new HashMap<>();
      try {
        Review persistedReview = reviewService.createReview(reviewForm);
        dataMap.put("review", persistedReview);
      } catch (IllegalArgumentException e) {
        throw new ReviewNotCreatedException();
      }
      return new ResponseEntity<>(dataMap, HttpStatus.CREATED);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteReview(@PathVariable Long id) {
    Optional<Review> review = reviewService.findById(id);
    if (review.isPresent()) {
      reviewService.deleteById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String, Review>> getReview(@PathVariable Long id) {
    Optional<Review> review = reviewService.findById(id);
    if (review.isPresent()) {
      Map<String, Review> dataMap = new HashMap<>();
      dataMap.put("review", review.get());
      return new ResponseEntity<>(dataMap, HttpStatus.OK);
    } else {
      throw new ReviewNotFoundException();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map> updateReview(@PathVariable Long id, @RequestBody @Valid Review changedReview,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      Map<String, String> errorList = new HashMap<>();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        errorList.put(fieldError.getField(), fieldError.getDefaultMessage());
      }
      Map<String, Map> errors = new HashMap<>();
      errors.put("errors", errorList);
      return new ResponseEntity<>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      Review updatedReview = reviewService.updateReview(id, changedReview);
      if (updatedReview != null) {
        try {
          Map<String, Review> dataMap = new HashMap<>();
          dataMap.put("review", updatedReview);
          return new ResponseEntity<>(dataMap, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
          throw new ReviewNotUpdatedException();
        }
      } else {
        throw new ReviewNotFoundException();
      }
    }
  }
}
