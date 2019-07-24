import dayjs from 'dayjs';
import store from '@/renderer/store/index';

function duration(value) {
  if (!value) return '00:00';
  const duration = dayjs(value);
  return duration.format('mm:ss');
}
function islike(songId) {
  const index = store.state.user.likeIds.indexOf(songId);
  return index !== -1;
}

function isPlaying(songId) {
  return store.state.player.song && songId === store.state.player.song.id;
}
export default {
  duration,
  islike,
  isPlaying
};
