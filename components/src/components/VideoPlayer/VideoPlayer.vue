<template>
  <div ref="rootElement" class="video-player"></div>
</template>

<script lang="ts">
import styleInject from 'style-inject';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import videojsStylesheet from 'video.js/dist/video-js.min.css?inline';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';

styleInject(videojsStylesheet);

/**
 * Video player component.
 */
export default defineComponent({
  name: 'VideoPlayer',
  props: {
    /**
     * Video.js player options.
     */
    options: {
      type: Object as PropType<VideoJsPlayerOptions>,
      required: true,
    },
  },
  emits: ['ready'],
  setup(props, { emit }) {
    const rootElement = ref<Element>();
    let player: VideoJsPlayer | null = null;

    const createPlayer = () => {
      const videoElement = document.createElement('video');
      videoElement.classList.add('video-js');
      rootElement.value?.append(videoElement);
      player = videojs(videoElement, props.options, () => emit('ready'));
    };

    const disposePlayer = () => {
      player?.dispose();
      player = null;
      Array.from(rootElement.value?.children || []).forEach((child) =>
        child.remove()
      );
    };

    onMounted(createPlayer);

    onBeforeUnmount(disposePlayer);

    watch(
      () => props.options,
      () => {
        disposePlayer();
        createPlayer();
      }
    );

    return { rootElement };
  },
});
</script>
