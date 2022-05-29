package com.launchacademy.reviews.exceptionHandling;

public class SiteNotUpdatedException extends RuntimeException {

  public SiteNotUpdatedException() {
    super("Could not update Haunted Site");
  }
}
