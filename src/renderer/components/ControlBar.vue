<style lang="less">
@import '~@/renderer/styles/vars.less';
.musicctrl {
  &__bar {
  }
  &__content {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
  }
}

.playbar-info {
  flex: 1;
  display: flex;
  &__pic {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: black;
    background-size: contain;
    background-position: center center;
  }
  &__text {
    flex: 1;
  }
  &__names {
    height: 20px;
    line-height: 20px;
  }
  &__song {
    display: inline-block;
  }
  &__singer {
    display: inline-block;
    color: @color-text-secondary;
  }
  &__timer {
  }
}
.playbar-ctrl {
  flex: 1;
  display: flex;
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
  &__button {
    font-size: 20px;
    line-height: 1;
    color: @color-danger;
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
</style>

<template>
  <div class="musicctrl">
    <div class="musicctrl__bar"></div>
    <div class="musicctrl__content">
      <div class="playbar-info">
        <div
          class="playbar-info__pic"
          :style="{ backgroundImage: `url(${song ? song.al.picUrl : ''})` }"
        ></div>
        <div v-if="song" class="playbar-info__text">
          <div class="playbar-info__names">
            <span class="playbar-info__song">{{ song.name }}</span>
            <span class="playbar-info__singer">{{ song._singer.name }}</span>
          </div>
          <div class="playbar-info__timer">
            00:00 / {{ song.dt | duration }}
          </div>
        </div>
      </div>
      <div class="playbar-ctrl">
        <div class="playbar-ctrl__button">
          <i v-if="song && sone.liked" class="icon-like"></i>
          <i class="icon-like-off"></i>
        </div>
        <div class="playbar-ctrl__button">
          <i class="icon-prev"></i>
        </div>
        <div class="playbar-ctrl__button playbar-ctrl__button--large">
          <i v-if="status && status.isPlaying" class="icon-pause"></i>
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
          <i v-if="status.voice > 0" class="icon-voice"></i>
          <i v-else class="icon-voice-off"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: {
    song: {
      type: Object,
      default: () => {
        return null;
      }
    },
    status: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {};
  }
};
</script>
