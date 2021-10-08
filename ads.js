var adContent = document.getElementById('adContainer');
var adDisplayContainer = new google.ima.AdDisplayContainer(adContent);
var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

adDisplayContainer.initialize();

function onAdError(e) {
  console.log(e);
  console.log(' error in ad ');
  adContent.style.display = 'none';
}
adsLoader.addEventListener(
  google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
  onAdsManagerLoaded,
  false
);
adsLoader.addEventListener(
  google.ima.AdErrorEvent.Type.AD_ERROR,
  onAdError,
  false
);
var contentEndedListener = function() {
  adsLoader.contentComplete();
  //console.log('ggg');
  adsLoader.destroy();
};
var adsRequest = new google.ima.AdsRequest();
adsRequest.adTagUrl =
  'https://tpc.googlesyndication.com/ima3vpaid?vad_format=linear&correlator=&adtagurl=https%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D400x300%7C640x480%26description_url%3Dhttps%253A%252F%252Fgameszone.hungama.com%252F%26vpos%3Dpreroll%26iu%3D%2F317733190%2FGameszone_mowlaps%26env%3Dvp%26gdfp_req%3D1%26output%3Dvast%26tfcd%3D0%26npa%3D0%26vpmute%3D0%26vpa%3D0%26type%3Djs%26unviewed_position_start%3D1';
adsRequest.linearAdSlotWidth = 640;
adsRequest.linearAdSlotHeight = 400;
adsRequest.nonLinearAdSlotWidth = 640;
adsRequest.nonLinearAdSlotHeight = 150;
function onContentPauseRequested() {}

function AdVideoComplete() {
  adContent.style.display = 'none';
  adsManager.destroy();
}

function onContentResumeRequested() {
  //console.log(" ad skipped ");
  adContent.style.display = 'none';
  adsManager.destroy();
}

function onUserClosed() {
  //console.log(" ad skipped ");
  adContent.style.display = 'none';
  adsManager.destroy();
}
// var playButton = document.getElementById('playButton');
// playButton.addEventListener('click', requestAds);

function requestAds() {
  adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(e) {
  adsManager = e.getAdsManager(adContent);
  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  );
  adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, onUserClosed);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.COMPLETE,
    AdVideoComplete
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    AdVideoComplete
  );
  adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, AdVideoComplete);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  );
  try {
    adsManager.init(
      window.innerWidth,
      window.innerHeight,
      google.ima.ViewMode.NORMAL
    );
    adsManager.start();
  } catch (e) {
    console.log('error loading ads', e);
    adContent.style.display = 'none';
  }
}
