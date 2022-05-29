package com.launchacademy.reviews.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  @GetMapping(value = { "/haunted-sites", "/haunted-sites/new", "/haunted-sites/{id}", "/haunted-sites/{id}/edit", "/reviews/{id}/edit" })
  public String forward() {
    return "forward:/";
  }
}