package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.HauntedSite;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.models.ReviewForm;
import com.launchacademy.reviews.repositories.ReviewRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ReviewDatabaseService implements ReviewService {

  private ReviewRepository reviewRepository;
  private HauntedSiteService hauntedSiteService;

  public ReviewDatabaseService(ReviewRepository reviewRepository,
      HauntedSiteService hauntedSiteService) {
    this.reviewRepository = reviewRepository;
    this.hauntedSiteService = hauntedSiteService;
  }

  @Override
  public List<Review> findAll() {
    return (List<Review>) reviewRepository.findAll();
  }

  @Override
  public void save(Review review) {
    reviewRepository.save(review);
  }

  @Override
  public Review createReview(ReviewForm reviewForm) {
    Review review = new Review();

    review.setUsername(reviewForm.getUsername());
    review.setRating(reviewForm.getRating());
    review.setComment(reviewForm.getComment());
    Optional<HauntedSite> hauntedSite = hauntedSiteService.findById(reviewForm.getSiteId());

    if (hauntedSite.isPresent()) {
      review.setHauntedSite(hauntedSite.get());
    }
    return reviewRepository.save(review);
  }

  @Override
  public void deleteById(Long id) {
    reviewRepository.deleteById(id);
  }

  @Override
  public void deleteAll(List<Review> reviews) {
    reviewRepository.deleteAll(reviews);
  }

  @Override
  public Optional<Review> findById(Long id) {
    return reviewRepository.findById(id);
  }

  @Override
  public Review updateReview(Long id, Review changedReview) {
    Optional<Review> reviewToUpdate = this.findById(id);
    if (reviewToUpdate.isPresent()) {
      Review review = reviewToUpdate.get();
      review.setUsername(changedReview.getUsername());
      review.setRating(changedReview.getRating());
      review.setComment(changedReview.getComment());
      this.save(review);
      return review;
    } else {
      return null;
    }
  }
}
