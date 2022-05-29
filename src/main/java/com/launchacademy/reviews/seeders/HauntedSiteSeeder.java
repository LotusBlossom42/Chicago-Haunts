package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.HauntedSite;
import com.launchacademy.reviews.services.HauntedSiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HauntedSiteSeeder {

  private final HauntedSiteService hauntedSiteService;

  @Autowired
  public HauntedSiteSeeder(HauntedSiteService hauntedSiteService) {
    this.hauntedSiteService = hauntedSiteService;
  }

  public void seed() {
    if (hauntedSiteService.findAll().size() == 0) {
      HauntedSite site1 = new HauntedSite();
      site1.setName("Wrigley Field");
      site1.setDescription("Disappearing baseballs, entities in the bleachers, cold spots, and the restless spirit of Harry Caray are a few of the ghostly tales that surround this historic ballpark, the second oldest in the United States, in fact.\n" + "\n" + "Thankfully, though, the ghosts don’t hamper the Cubs’ avid fans … and they won’t do a disappearing act with your hotdog and beer!\n");
      site1.setImgUrl("https://architizer-prod.imgix.net/media/1398283061914chi-cubsvin74-19490418.jpeg?fit=max&w=625&q=60&auto=format&auto=compress&cs=strip");
      site1.setCoordinates("41.948605949153226°, -87.65538634584497°");
      site1.setWebsiteUrl("https://www.mlb.com/cubs/ballpark");
      hauntedSiteService.save(site1);

      HauntedSite site2 = new HauntedSite();
      site2.setName("St. Michael’s Church");
      site2.setDescription("Old Town is one of the most sought-after neighborhoods in Chicago, with its beautiful Victorian row homes and charming boutiques. It’s also home to St. Michael’s Church (1633 N. Cleveland Ave.), where, it is said, the Devil himself visits. In the 1970s, it was reported that a figure appeared in the Communion line one Sunday, dressed in a hooded robe, with hooves instead of feet. If you’re looking for a little light-heartedness after your tour of the church, head to world-famous improv theater Second City which lies just a stone’s throw away.");
      site2.setImgUrl("https://cdn.choosechicago.com/uploads/2019/05/A_Alexander_SU4A8739_951c265d-23b9-4c9f-b2b0-a418f35604da.jpg");
      site2.setCoordinates("41.912264844751235°, -87.64084370694725°");
      site2.setWebsiteUrl("https://www.st-mikes.org/");
      hauntedSiteService.save(site2);

      HauntedSite site3 = new HauntedSite();
      site3.setName("Red Lion Pub");
      site3.setDescription("Once Dirty Dan’s Western Saloon, built in 1882, one thing the locals know for sure is that the Red Lion Pub (2446 N Lincoln Ave) is haunted. Some would go so far as to call it the most haunted bar in Chicago.\n" +
        "\n" + "Multiple sightings over the decades include a bearded man, a girl affectionately dubbed Sharon who loves to play pranks, a woman in 1920s garb, and even a cowboy. From being locked in bathroom stalls to plates flying out of servers’ hands, ghostly reports run as rampant as the spirits.");
      site3.setImgUrl("https://cdn.vox-cdn.com/uploads/chorus_asset/file/733968/14467271030_8418021b58_b.0.jpg");
      site3.setCoordinates("41.92644893402434°, -87.6504506953425°");
      site3.setWebsiteUrl("http://redlionchicago.com/");
      hauntedSiteService.save(site3);
    }
  }
}