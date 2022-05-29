package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandling.ReviewNotFoundException;
import com.launchacademy.reviews.exceptionHandling.ReviewNotUpdatedException;
import com.launchacademy.reviews.exceptionHandling.SiteNotCreatedException;
import com.launchacademy.reviews.exceptionHandling.SiteNotFoundException;
import com.launchacademy.reviews.exceptionHandling.SiteNotUpdatedException;
import com.launchacademy.reviews.models.HauntedSite;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.HauntedSiteService;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/haunted-sites")
public class HauntedSiteApiV1Controller {

  private HauntedSiteService hauntedSiteService;

  @Autowired
  public HauntedSiteApiV1Controller(HauntedSiteService hauntedSiteService) {
    this.hauntedSiteService = hauntedSiteService;
  }

  @GetMapping
  public ResponseEntity<Map<String, List<HauntedSite>>> getSites() {
    Map<String, List<HauntedSite>> dataMap = new HashMap<>();
    dataMap.put("sites", hauntedSiteService.findAll());
    return new ResponseEntity<>(dataMap, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Map<String, HauntedSite>> getShow(@PathVariable Long id) {
    Map<String, HauntedSite> dataMap = new HashMap<>();
    Optional<HauntedSite> hauntedSite = hauntedSiteService.findById(id);
    if (hauntedSite.isPresent()) {
      dataMap.put("site", hauntedSite.get());
    } else {
      throw new SiteNotFoundException();
    }
    return new ResponseEntity<>(dataMap, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity addSite(@RequestBody @Valid HauntedSite hauntedSite,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      Map<String, String> errorList = new HashMap<>();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        errorList.put(fieldError.getField(), fieldError.getDefaultMessage());
      }
      Map<String, Map> errors = new HashMap<>();
      errors.put("errors", errorList);
      return new ResponseEntity<Map<String, Map>>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      try {
        hauntedSiteService.save(hauntedSite);
        Map<String, HauntedSite> dataMap = new HashMap<>();
        dataMap.put("site", hauntedSite);
        return new ResponseEntity<Map<String, HauntedSite>>(dataMap, HttpStatus.CREATED);
      } catch (IllegalArgumentException ex) {
        throw new SiteNotCreatedException();
      }
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteSite(@PathVariable Long id) {
    if (hauntedSiteService.findById(id).isPresent()) {
      hauntedSiteService.deleteById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      throw new SiteNotFoundException();
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map> updateSite(@PathVariable Long id, @RequestBody @Valid HauntedSite changedHauntedSite,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      Map<String, String> errorList = new HashMap<>();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        errorList.put(fieldError.getField(), fieldError.getDefaultMessage());
      }
      Map<String, Map> errors = new HashMap<>();
      errors.put("errors", errorList);
      return new ResponseEntity<>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      HauntedSite updatedHauntedSite = hauntedSiteService.updateSite(id, changedHauntedSite);
      if (updatedHauntedSite != null) {
        try {
          Map<String, HauntedSite> dataMap = new HashMap<>();
          dataMap.put("site", updatedHauntedSite);
          return new ResponseEntity<>(dataMap, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
          throw new SiteNotUpdatedException();
        }
      } else {
        throw new SiteNotFoundException();
      }
    }
  }
}
