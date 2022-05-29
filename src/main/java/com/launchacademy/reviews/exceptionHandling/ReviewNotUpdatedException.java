package com.launchacademy.reviews.exceptionHandling;

public class ReviewNotUpdatedException extends RuntimeException {

  public ReviewNotUpdatedException() {
    super("Could not update review");
  }
}
