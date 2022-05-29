package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.models.ReviewForm;
import java.util.List;
import java.util.Optional;

public interface ReviewService {

  List<Review> findAll();

  void save(Review review);

  Review createReview(ReviewForm reviewForm);

  void deleteById(Long id);

  Optional<Review> findById(Long id);

  void deleteAll(List<Review> reviews);

  Review updateReview(Long id, Review changedReview);
}