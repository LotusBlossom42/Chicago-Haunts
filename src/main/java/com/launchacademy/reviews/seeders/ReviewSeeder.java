package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.HauntedSite;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.HauntedSiteService;
import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {

  private ReviewService reviewService;
  private HauntedSiteService hauntedSiteService;

  @Autowired
  public ReviewSeeder(ReviewService reviewService,
    HauntedSiteService hauntedSiteService) {
    this.reviewService = reviewService;
    this.hauntedSiteService = hauntedSiteService;
  }

  public void seed() {
    if (reviewService.findAll().size() == 0) {
      HauntedSite wrigley = hauntedSiteService.findByName("Wrigley Field");

      Review review1 = new Review();
      review1.setUsername("GhostHunter777");
      review1.setRating(1);
      review1.setComment("No ghosts, only baseballs. Very disappointed.");
      review1.setHauntedSite(wrigley);
      reviewService.save(review1);
      
      Review review2 = new Review();
      review2.setUsername("John");
      review2.setRating(5);
      review2.setHauntedSite(wrigley);
      reviewService.save(review2);

      HauntedSite church = hauntedSiteService.findByName("St. Michael’s Church");

      Review review3 = new Review();
      review3.setUsername("Paranormalized");
      review3.setRating(5);
      review3.setComment("Never been more scared in my life! I’ve slept with my lights on ever since");
      review3.setHauntedSite(church);
      reviewService.save(review3);

      Review review4 = new Review();
      review4.setUsername("Mudkip254");
      review4.setRating(3);
      review4.setComment(
        "Meh");
      review4.setHauntedSite(church);
      reviewService.save(review4);

      HauntedSite redLion = hauntedSiteService.findByName("Red Lion Pub");

      Review review5 = new Review();
      review5.setUsername("HungryHowie");
      review5.setRating(4);
      review5.setComment(
        "Great service, but I didn’t see a ghost.");
      review5.setHauntedSite(redLion);
      reviewService.save(review5);

      Review review6 = new Review();
      review6.setUsername("TheChosenOne");
      review6.setRating(2);
      review6.setComment(
        "I saw the ghost but I wasn’t scared lol");
      review6.setHauntedSite(redLion);
      reviewService.save(review6);
    }
  }
}
