<template>
  <div :class="$style['video-player-container']">
    <div ref="videoRef" class="w-full h-full z-0" :class="props.videoName"></div>
  </div>
</template>

<script lang="ts" setup>
import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  url: {
    type: String,
    default: () => '',
  },
  videoName: {
    type: String,
    default: () => 'artPlayer',
  },
  controls: {
    type: Array as () => any[] | null,
    default: () => null,
  },
});
const videoRef = ref();
const art = ref();

function initArtPlayer(type?: string) {
  if (!props.url) return;
  let customType = {};
  if (type === 'flv') customType = { flv: playFlv };
  if (type === 'm3u8') customType = { m3u8: playM3u8 };
  art.value = new Artplayer({
    container: '.' + props.videoName,
    isLive: true,
    autoplay: false,
    muted: true,
    autoSize: true,
    fullscreen: true, // 全屏
    url: props.url,
    type: type || '',
    customType,
  });
  const controls = props.controls || [];
  controls.forEach((item) => {
    art.value.controls.add(item);
  });
}

function playFlv(video: any, url: string, art: any) {
  if (flvjs.isSupported()) {
    if (art.flv) art.flv.destroy();
    const flv = flvjs.createPlayer({ type: 'flv', url });
    flv.attachMediaElement(video);
    flv.load();
    art.flv = flv;
    art.on('destroy', () => flv.destroy());
  } else {
    art.notice.show = 'Unsupported playback format: flv';
  }
}

function playM3u8(video: any, url: string, art: any) {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;
    art.on('destroy', () => hls.destroy());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  } else {
    art.notice.show = 'Unsupported playback format: m3u8';
  }
}

onMounted(() => {
  if (props.url.includes('flv')) {
    initArtPlayer('flv');
  } else if (props.url.includes('.m3u8') || props.url.includes('hls')) {
    initArtPlayer('m3u8');
  } else {
    initArtPlayer();
  }
});

onUnmounted(() => {
  if (art.value && art.value.destroy) {
    art.value.destroy(false);
  }
});

defineComponent({ name: 'ArtPlayerComp' });
</script>

<style module lang="scss">
.video-player-container {
  @apply w-full h-full;

  :global(.art-video-player) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
