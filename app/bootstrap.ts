import { Video, Stream, Subtitle } from './media/video';
import { NextVideo } from './media/nextvideo';
import { Player } from './media/player';
import * as request from 'request-promise-native';
import { importCSS, importCSSByUrl } from './utils/css';

const css = require('raw-loader!./styles.css');

class Bootstrap {
  private wrapper: Element;
  private player: Player = new Player();

  constructor() {
    this.wrapper = document.querySelector("#showmedia_video_player");
    this.wrapper.textContent = "Loading HTML5 player...";

    importCSSByUrl("https://fonts.googleapis.com/css?family=Noto+Sans");
    importCSS(css);
  }

  async run() {
    this.wrapper.innerHTML = "";
    this.player.attach(this.wrapper);

    var video = await Video.fromDocument(location.href, document, true);
    if (video.streams.length > 0) {
      let stream = video.streams[0];

      if (stream.nextUrl) {
        this.player.setNextVideo(NextVideo.fromUrlUsingDocument(stream.nextUrl));
      }

      console.log(stream.subtitles[0].toAss());

      this.player.setStream(stream);
    } else {
      //let stream = await Stream.fromUrl(location.href, video.videoId, "trailer", '0', '');
    }
  }
}

if (Video.validateUrl(location.href)) {
  (new Bootstrap()).run();
}