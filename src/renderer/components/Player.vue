<template>
  <div class="jplayer">
    <audio ref="audioEl" autoplay />
    <div class="jplayer__bar">
      <vue-slider
        :dot-size="[8, 8]"
        :duration="0.1"
        :height="2"
        :value="durationVal"
        class="jplayer__slider"
        direction="ltr"
        tooltip="none"
        @change="durationChangeHandler"
      ></vue-slider>
    </div>
    <div class="jplayer__content">
      <div class="jplayer__info">
        <div
          :style="{ backgroundImage: `url(${song ? song.pic : ''})` }"
          class="jplayer__pic"
        ></div>
        <div v-if="song" class="jplayer__text">
          <div class="jplayer__names">
            <div class="jplayer__song">{{ song ? song.name : '' }}</div>
            <div class="jplayer__singer">{{ song ? song.singer : '' }}</div>
          </div>
          <div class="jplayer__timer">
            {{ status.duration | duration }} / {{ song.duration | duration }}
          </div>
        </div>
      </div>
      <div class="jplayer__ctrl">
        <div class="jplayer__button" @click="likeClickHandler">
          <i v-if="song && song.liked" class="icon-like"></i>
          <i class="icon-like-off"></i>
        </div>
        <div class="jplayer__button" @click="prevClickHandler">
          <i class="icon-prev"></i>
        </div>
        <div class="jplayer__button jplayer__button--play" @click="playHandler">
          <i v-if="status.playing" class="icon-pause"></i>
          <i v-else class="icon-play"></i>
        </div>
        <div class="jplayer__button" @click="nextClickHandler">
          <i class="icon-next"></i>
        </div>
        <div class="jplayer__button" @click="modeClickHandler">
          <i v-if="mode === 'recommend'" class="icon-mode-recommend"></i>
          <i v-if="mode === 'list'" class="icon-mode-list"></i>
          <i v-if="mode === 'single'" class="icon-mode-single"></i>
          <i v-if="mode === 'random'" class="icon-mode-random"></i>
        </div>
      </div>
      <div class="jplayer__other">
        <div class="jplayer__button">
          <i class="icon-list"></i>
        </div>
        <div class="jplayer__button">
          <el-tooltip
            effect="light"
            placement="top"
            popper-class="jplayer__volume-tooltip"
          >
            <vue-slider
              slot="content"
              :dot-size="[10, 10]"
              :duration="0.2"
              :height="80"
              :value="volumeVal"
              direction="btt"
              tooltip="none"
              @change="volumeChangeHandler"
            ></vue-slider>
            <i
              v-if="volumeVal <= 0"
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
import './Player.less';
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
          duration: 0,
          liked: false
        };
      }
    },
    mode: {
      type: String,
      default: 'list',
      validator: function(value) {
        return ['recommend', 'random', 'list', 'single'].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      status: {
        playing: false,
        duration: 0,
        volume: 100,
        muted: false
      },
      audioEl: null
    };
  },
  computed: {
    durationVal() {
      if (this.status.duration) {
        const val = (this.status.duration / this.song.duration) * 100;
        return val > 100 ? 100 : val;
      }
      return 0;
    },
    volumeVal() {
      if (this.audioEl) {
        return this.status.muted ? 0 : this.status.volume;
      }
      return 100;
    }
  },
  watch: {
    song(val) {
      this.initHowl(val);
    }
  },
  mounted() {
    this.audioEl = this.$refs.audioEl;
  },
  methods: {
    initHowl(song) {
      this.status.playing = false;
      this.status.duration = 0;
      this.audioEl.src = song.src;
      this.audioEl.oncanplay = () => {
        console.log(`oncanplay`);
      };
      this.audioEl.onerror = () => {
        console.log(`onerror`);
        this.$emit('onerror');
      };
      this.audioEl.onplay = () => {
        console.log(`onplay`);
        // this.status.playing = true;
      };
      this.audioEl.onplaying = () => {
        console.log(`onplaying`);
        this.status.playing = true;
      };
      this.audioEl.onpause = () => {
        console.log(`onpause`);
        this.status.playing = false;
      };
      this.audioEl.onended = () => {
        console.log(`onended`);
        this.status.playing = false;
        this.$emit('onended');
      };
      this.audioEl.oncanplay = () => {
        console.log(`oncanplay`);
      };
      this.audioEl.ontimeupdate = () => {
        console.log(`ontimeupdate`);
        this.status.duration = this.audioEl.currentTime * 1000;
      };
      this.audioEl.onvolumechange = () => {
        console.log(`onvolumechange`);
      };
    },
    playHandler() {
      if (this.audioEl.duration > 0) {
        const stoped = this.audioEl.paused || this.audioEl.ended;
        if (stoped) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    },
    volumeChangeHandler(volume) {
      this.audioEl.volume = volume / 100;
      this.status.volume = volume;
    },
    muteHandler(muted) {
      this.status.muted = muted;
      if (muted) {
        this.audioEl.muted = muted;
      } else {
        this.audioEl.muted = muted;
        if (this.audioEl.volume <= 0) {
          this.volumeChangeHandler(100);
        }
      }
    },
    durationChangeHandler(value) {
      if (this.song && this.song.duration > 0) {
        const duration = (value / 100) * (this.song.duration / 1000);
        this.audioEl.currentTime = duration;
      } else {
        this.status.duration = 0;
      }
    },
    likeClickHandler() {
      this.song && this.$emit('like', { id: this.song.id });
    },
    prevClickHandler() {
      this.song && this.$emit('prev', { id: this.song.id });
    },
    nextClickHandler() {
      this.song && this.$emit('next', { id: this.song.id });
    },
    modeClickHandler() {
      this.song && this.$emit('mode', { id: this.song.id });
    },
    listClickHandler() {
      this.song && this.$emit('list', { id: this.song.id });
    }
  }
};
</script>
