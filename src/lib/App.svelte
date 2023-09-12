<script lang="ts">
    import {Canvas, T} from "@threlte/core";
    import World from "$lib/World.svelte";
    import {setContext} from "svelte";
    import {writable} from "svelte/store";
    import Effect from "$lib/Effect.svelte";
    import Camera from "$lib/Camera.svelte";

    const scene = setContext('scene', writable(undefined));
    const selectable = setContext('selectable', writable(0));

    export let round = 0, act = false;
</script>

<main class:cursor={$selectable}>
    <Canvas>
        <T.Scene bind:ref={$scene}>
            <World>
                <Camera bind:round {act} on:act/>
                <slot/>
            </World>
        </T.Scene>
        <Effect/>
    </Canvas>
</main>

<style lang="scss">
  main {
    height: 100%;

    &.cursor {
      cursor: pointer;
    }
  }
</style>