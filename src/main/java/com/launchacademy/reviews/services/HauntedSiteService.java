package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.HauntedSite;
import java.util.List;
import java.util.Optional;

public interface HauntedSiteService {

  List<HauntedSite> findAll();

  void save(HauntedSite hauntedSite);

  Optional<HauntedSite> findById(Long id);

  HauntedSite findByName(String name);

  void deleteById(Long id);

  HauntedSite updateSite(Long id, HauntedSite changedHauntedSite);
}
