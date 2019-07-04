<style lang="less">
@import '~@/renderer/styles/vars.less';
.musicctrl {
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
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
    <div class="musicctrl__bar"></div>
    <div class="musicctrl__content">
      <div class="playbar-info">
        <div
          class="playbar-info__pic"
          :style="{ backgroundImage: `url(${song ? song.al.picUrl : ''})` }"
        ></div>
        <div v-if="song" class="playbar-info__text">
          <div class="playbar-info__names">
            <div class="playbar-info__song">{{ song.name }}</div>
            <div class="playbar-info__singer">{{ song._singer.name }}</div>
          </div>
          <div class="playbar-info__timer">
            00:00 / {{ song.dt | duration }}
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
          <i v-if="status && status.voice <= 0" class="icon-voice-off"></i>
          <i v-else class="icon-voice"></i>
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
