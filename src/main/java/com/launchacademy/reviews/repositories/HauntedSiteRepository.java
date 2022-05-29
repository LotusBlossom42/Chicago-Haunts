package com.launchacademy.reviews.repositories;

import com.launchacademy.reviews.models.HauntedSite;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HauntedSiteRepository extends CrudRepository<HauntedSite, Long> {
  HauntedSite findByName(String name);

}
