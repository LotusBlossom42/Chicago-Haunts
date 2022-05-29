package com.launchacademy.reviews.exceptionHandling;

public class SiteNotCreatedException extends RuntimeException {

  public SiteNotCreatedException() {
    super("Could not create haunted site");
  }
}
