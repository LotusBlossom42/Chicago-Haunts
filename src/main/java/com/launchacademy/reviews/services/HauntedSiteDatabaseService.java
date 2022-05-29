package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.HauntedSite;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.HauntedSiteRepository;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HauntedSiteDatabaseService implements HauntedSiteService {

  private HauntedSiteRepository hauntedSiteRepository;

  @Autowired
  public HauntedSiteDatabaseService(HauntedSiteRepository hauntedSiteRepository) {
    this.hauntedSiteRepository = hauntedSiteRepository;
  }

  @Override
  public List<HauntedSite> findAll() {
    return (List<HauntedSite>) hauntedSiteRepository.findAll();
  }

  @Override
  public void save(HauntedSite hauntedSite) {
    hauntedSiteRepository.save(hauntedSite);
  }

  @Override
  public Optional<HauntedSite> findById(Long id) {
    return hauntedSiteRepository.findById(id);
  }

  @Override
  public HauntedSite findByName(String name) {
    return hauntedSiteRepository.findByName(name);
  }

  @Override
  public void deleteById(Long id) {
    hauntedSiteRepository.deleteById(id);
  }

  @Override
  public HauntedSite updateSite(Long id, HauntedSite changedHauntedSite) {
    Optional<HauntedSite> hauntedSiteToUpdate = this.findById(id);
    if (hauntedSiteToUpdate.isPresent()) {
      HauntedSite hauntedSite = hauntedSiteToUpdate.get();
      hauntedSite.setName(changedHauntedSite.getName());
      hauntedSite.setDescription(changedHauntedSite.getDescription());
      hauntedSite.setImgUrl(changedHauntedSite.getImgUrl());
      hauntedSite.setWebsiteUrl(changedHauntedSite.getWebsiteUrl());
      hauntedSite.setCoordinates(changedHauntedSite.getCoordinates());
      this.save(hauntedSite);
      return hauntedSite;
    } else {
      return null;
    }
  }
}
