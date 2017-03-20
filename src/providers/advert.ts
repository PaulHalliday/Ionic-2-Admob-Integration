import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular'
import { AdMob, AdMobOptions, AdMobAdExtras } from 'ionic-native';
import 'rxjs/add/operator/map';

@Injectable()
export class Advert {
  //AdMob IDs from the AdMob console
  private adMobId: { banner: string, interstitial: string };
  private adOptions: AdMobOptions = <AdMobOptions>{};

  //private adExtras: AdMobAdExtras = <AdMobAdExtras>{};

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.initAds();
    });
  }

  private initAds() {
    if (!AdMob) {
      console.log("AdMob not found.");
      return;
    }
    this.setAdMobIds();
    this.setAdMobOptions();
    this.registerAdMobEvents();
    this.showBanner();
  }

private registerAdMobEvents() {
  document.addEventListener('onAdFailLoad', data => console.log(JSON.stringify(data)));
  document.addEventListener('onAdLoaded', data => console.log(JSON.stringify(data)));
  document.addEventListener('onAdPresent', data => console.log(JSON.stringify(data)));
  document.addEventListener('onAdDismiss', data => console.log(JSON.stringify(data)));
  document.addEventListener('onAdLeaveApp', data => console.log(JSON.stringify(data)));
}

  private setAdMobIds() {
    /* 
      Replace IDs with supplied ones via AdMob.
      Different one per platform allows for better analytics
    */
    if (this.platform.is('android')) {
      this.adMobId = {
        banner: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX",
        interstitial: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX"
      }
    }
    else if (this.platform.is('ios')) {
      this.adMobId = {
        banner: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX",
        interstitial: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  }

  private setAdMobOptions() {
    this.adOptions = {
      position: AdMob.AD_POSITION.CENTER,
      isTesting: false,
      autoShow: true
      //adExtras: this.adExtras
    }

    AdMob.setOptions(this.adOptions)
  }

public showInterstitial() {
  if (!AdMob) return false;
  AdMob.prepareInterstitial(this.adMobId);
  return true;
}

public showBanner() {
  if (!AdMob) return false;

  AdMob.createBanner(this.adMobId);
  return true;
}

public removeAds() {
  if (AdMob) AdMob.removeBanner();
}


}
