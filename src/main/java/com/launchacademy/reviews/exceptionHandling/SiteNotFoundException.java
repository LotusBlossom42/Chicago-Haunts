package com.launchacademy.reviews.exceptionHandling;

public class SiteNotFoundException extends RuntimeException {
  public SiteNotFoundException() {
    super ("Could not find site");
  }
}
