package com.launchacademy.reviews.exceptionHandling;

public class ReviewNotCreatedException extends RuntimeException {

  public ReviewNotCreatedException() { super("Could not create review");
  }
}
