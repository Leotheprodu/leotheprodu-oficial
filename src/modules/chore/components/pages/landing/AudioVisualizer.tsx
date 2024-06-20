// @ts-nocheck

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { suspend } from 'suspend-react';
import * as THREE from 'three';
import { $IsPlayingHero } from '@/stores/player';

export function Track({
  url,
  y = 1000,
  space = 1.8,
  width = 0.03,
  height = 0.2,
  obj = new THREE.Object3D(),
  ...props
}: {
  url: string;
  y?: number;
  space?: number;
  width?: number;
  height?: number;
  obj?: THREE.Object3D;
  props?: any;
}) {
  const ref = useRef<any>(null);

  // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.
  const { gain, context, update, data, source } = suspend(
    () => createAudio(url),
    [url]
  );
  useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination);
    // Disconnect it on unmount
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame(() => {
    let avg = update();
    // Distribute the instanced planes according to the frequency daza
    for (let i = 0; i < data.length; i++) {
      obj.position.set(
        i * width * space - (data.length * width * space) / 2,
        data[i] / y,
        0
      );
      obj.updateMatrix();

      ref.current.setMatrixAt(i, obj.matrix);
      // Set the hue according to the frequency average
      ref.current.material.color.setHSL(avg / 50, 0.75, 0.75);
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });
  /* useEffect(() => {
    // Play or pause the audio source
    isPlaying ? source.stop(0) : source.start(0);
  }, [isPlaying]); */

  const handlePlay = () => {
    // Start the audio source
    /* setIsPlaying(!isPlaying); */
    $IsPlayingHero.set(true);
    source.start(0);
  };
  return (
    <instancedMesh
      onClick={handlePlay}
      /* onPointerEnter={(event) => (event.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)} */
      scale={4}
      castShadow
      ref={ref}
      args={[null, null, data.length]}
      {...props}
    >
      <boxGeometry args={[width, height, 0.1]} />
      <meshBasicMaterial />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} wireframe /> */}
      {/* <sphereGeometry args={[1, 5, 5]} /> */}
    </instancedMesh>
  );
}

export function Zoom({ url }: { url: string }) {
  // This will *not* re-create a new audio source, suspense is always cached,
  // so this will just access (or create and then cache) the source according to the url
  const { data } = suspend(() => createAudio(url), [url]);
  return useFrame((state) => {
    // Set the cameras field of view according to the frequency average
    state.camera.fov = 30 - data.avg / 15;
    state.camera.updateProjectionMatrix();
  });
}

async function createAudio(url: string) {
  // Fetch audio data and create a buffer source
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0);
  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);
  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);

  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data);
      // Calculate a frequency average
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ));
    },
  };
}
