<style lang="less">
@import '~@/renderer/styles/vars.less';
@import '~@/renderer/styles/vue-slider-component';

.musicctrl {
  height: 65px;
  &__bar {
    .player-slider {
      .vue-slider-dot {
        visibility: hidden;
      }
      &:hover {
        .vue-slider-dot {
          visibility: visible;
        }
      }
    }
  }
  &__content {
    background-color: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px 10px 10px;
  }
}
.volume-tooltip {
  border-color: @border-color-base !important;
  .popper__arrow {
    border-top-color: @border-color-base !important;
  }
}
.playbar-info {
  flex: 1;
  display: flex;
  overflow: hidden;
  &__pic {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background-color: black;
    background-size: contain;
    background-position: center center;
  }
  &__text {
    flex: 1;
    padding-left: 10px;
    overflow: hidden;
  }
  &__names {
    height: 22px;
    display: flex;
    white-space: nowrap;
    align-items: flex-end;
  }
  &__song {
    font-size: @font-size-base;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__singer {
    flex: 1;
    color: @color-text-regular;
    font-size: @font-size-extra-small;
  }
  &__timer {
    height: 18px;
    line-height: 18px;
    color: @color-text-secondary;
    font-size: @font-size-extra-small;
  }
}
.playbar-ctrl {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &__button {
    font-size: 20px;
    line-height: 1;
    color: @color-danger;
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    &--large {
      color: #fff;
      background-color: @color-danger;
      border-radius: 20px;
      margin: 0 16px;
    }
  }
}
.playbar-other {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: @color-text-regular;
  &__button {
    font-size: 20px;
    line-height: 1;
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
</style>

<template>
  <div class="musicctrl">
    <div class="musicctrl__bar">
      <vue-slider
        class="player-slider"
        direction="ltr"
        tooltip="none"
        :value="durationVal"
        :height="2"
        :dot-size="[8, 8]"
        :duration="0.2"
      ></vue-slider>
    </div>
    <div class="musicctrl__content">
      <div class="playbar-info">
        <div
          class="playbar-info__pic"
          :style="{ backgroundImage: `url(${song ? song.pic : ''})` }"
        ></div>
        <div v-if="song" class="playbar-info__text">
          <div class="playbar-info__names">
            <div class="playbar-info__song">{{ song ? song.name : '' }}</div>
            <div class="playbar-info__singer">
              {{ song ? song.singer : '' }}
            </div>
          </div>
          <div class="playbar-info__timer">
            {{ status.duration | duration }} / {{ song.duration | duration }}
          </div>
        </div>
      </div>
      <div class="playbar-ctrl">
        <div class="playbar-ctrl__button">
          <i v-if="song && song.liked" class="icon-like"></i>
          <i class="icon-like-off"></i>
        </div>
        <div class="playbar-ctrl__button">
          <i class="icon-prev"></i>
        </div>
        <div
          class="playbar-ctrl__button playbar-ctrl__button--large"
          @click="playHandler"
        >
          <i v-if="status.playing" class="icon-pause"></i>
          <i v-else class="icon-play"></i>
        </div>
        <div class="playbar-ctrl__button">
          <i class="icon-next"></i>
        </div>
        <div class="playbar-ctrl__button">
          <i class="icon-mode-recommend"></i>
          <!-- <i class="icon-mode-random"></i>
          <i class="icon-mode-list"></i>
          <i class="icon-mode-single"></i> -->
        </div>
      </div>
      <div class="playbar-other">
        <div class="playbar-other__button">
          <i class="icon-list"></i>
        </div>
        <div v-popover:popover1 class="playbar-other__button">
          <el-tooltip
            popper-class="volume-tooltip"
            placement="top"
            effect="light"
          >
            <vue-slider
              slot="content"
              :value="status.muted ? 0 : status.volume"
              direction="btt"
              tooltip="none"
              :dot-size="[10, 10]"
              :height="80"
              :duration="0.2"
              :lazy="true"
              @change="volumeChangeHandler"
            ></vue-slider>
            <i
              v-if="status.muted || status.volume <= 0"
              class="icon-voice-off"
              @click="muteHandler(false)"
            ></i>
            <i v-else class="icon-voice" @click="muteHandler(true)"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
import VueSlider from 'vue-slider-component';

export default {
  components: {
    VueSlider
  },
  props: {
    song: {
      type: Object,
      default: () => {
        return {
          id: '',
          pic: '',
          src: '',
          name: '',
          singer: '',
          duration: 0
        };
      }
    }
  },
  sound: null,
  data() {
    return {
      status: {
        playing: false,
        muted: false,
        duration: 0,
        volume: Howler.volume() * 100
      },
      soundId: null
    };
  },
  computed: {
    durationVal() {
      if (this.status.duration) {
        return (this.status.duration / this.song.duration) * 100;
      }
      return 0;
    }
  },
  watch: {
    song(val) {
      console.log(val);

      this.initHowl(val);
    }
  },
  mounted() {
    setInterval(() => {
      if (this.sound && this.soundId) {
        this.status.duration = this.sound.seek() * 1000;
        console.log('=======');

        console.log(this.status.duration);
        console.log(this.song.duration);
        console.log(this.durationVal);
      }
    }, 1000);
  },
  methods: {
    initHowl(song) {
      this.soundId = null;
      this.sound = new Howl({
        html5: true,
        src: [song.src],
        onload() {
          console.log('onload');
        },
        onloaderror() {
          console.log('onloaderror');
        },
        onplayerror() {
          console.log('onplayerror');
        },
        onplay() {
          console.log('onplay');
        },
        onend() {
          console.log('onend');
        },
        onpause() {
          console.log('onpause');
        },
        onstop() {
          console.log('onstop');
        }
      });
      console.log(this.sound);
    },
    playHandler() {
      const playing = this.sound.playing();
      if (playing) {
        this.sound.pause();
        this.status.playing = false;
      } else {
        this.soundId = this.sound.play();
        this.status.playing = true;
      }
    },
    volumeChangeHandler(volume) {
      this.status.volume = volume;
      Howler.volume(volume / 100);
    },
    muteHandler(muted) {
      Howler.mute(muted);
      this.status.muted = muted;
      if (this.status.volume <= 0) {
        this.volumeChangeHandler(50);
      }
    }
  }
};
</script>
