package com.launchacademy.reviews.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MainSeeder implements CommandLineRunner {

  private HauntedSiteSeeder hauntedSiteSeeder;
  private ReviewSeeder reviewSeeder;

  @Autowired
  public MainSeeder(HauntedSiteSeeder hauntedSiteSeeder,
    ReviewSeeder reviewSeeder) {
    this.hauntedSiteSeeder = hauntedSiteSeeder;
    this.reviewSeeder = reviewSeeder;
  }

  @Override
  public void run(String... args) throws Exception {
    hauntedSiteSeeder.seed();
    reviewSeeder.seed();
  }
}
