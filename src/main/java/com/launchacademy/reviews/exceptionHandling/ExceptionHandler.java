package com.launchacademy.reviews.exceptionHandling;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {SiteNotFoundException.class})
  public ResponseEntity<String> handleSiteNotFoundException(SiteNotFoundException ex) {
    return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {ReviewNotFoundException.class})
  public ResponseEntity<String> handleReviewNotFoundException(ReviewNotFoundException ex) {
    return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {SiteNotCreatedException.class})
  public ResponseEntity<Map<String, List>> handleSiteNotCreatedException(
      SiteNotCreatedException ex) {
    List<String> errorList = new ArrayList<>();
    errorList.add(ex.getMessage());
    Map<String, List> responseBody = new HashMap<>();
    responseBody.put("errors", errorList);
    return new ResponseEntity<Map<String, List>>(responseBody, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {
      ReviewNotCreatedException.class})
  public ResponseEntity<Map<String, List>> handleReviewNotCreatedException(
      ReviewNotCreatedException ex) {
    List<String> errorList = new ArrayList<>();
    errorList.add(ex.getMessage());
    Map<String, List> responseBody = new HashMap<>();
    responseBody.put("errors", errorList);
    return new ResponseEntity<Map<String, List>>(responseBody, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {
      ReviewNotUpdatedException.class})
  public ResponseEntity<Map<String, List>> handleReviewNotUpdatedException(
      ReviewNotUpdatedException ex) {
    List<String> errorList = new ArrayList<>();
    errorList.add(ex.getMessage());
    Map<String, List> responseBody = new HashMap<>();
    responseBody.put("errors", errorList);
    return new ResponseEntity<Map<String, List>>(responseBody, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = {
      SiteNotUpdatedException.class})
  public ResponseEntity<Map<String, List>> handleSiteNotUpdatedException(
      SiteNotUpdatedException ex) {
    List<String> errorList = new ArrayList<>();
    errorList.add(ex.getMessage());
    Map<String, List> responseBody = new HashMap<>();
    responseBody.put("errors", errorList);
    return new ResponseEntity<Map<String, List>>(responseBody, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
