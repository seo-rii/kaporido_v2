<script lang="ts">
    import {Canvas, T} from "@threlte/core";
    import World from "$lib/World.svelte";
    import {onMount, setContext} from "svelte";
    import {writable} from "svelte/store";
    import Effect from "$lib/Effect.svelte";
    import Camera from "$lib/Camera.svelte";

    const scene = setContext('scene', writable(undefined));
    const selectable = setContext('selectable', writable(0));
    const dpr = setContext('dpr', writable(1.2));

    export let round = 0, dragged = false;
</script>

<main class:cursor={$selectable}>
    <Canvas dpr={$dpr}>
        <T.Scene bind:ref={$scene}>
            <World>
                <Camera bind:round bind:dragged on:act/>
                <slot/>
            </World>
        </T.Scene>
        {#key $dpr}
            <Effect/>
        {/key}
    </Canvas>
</main>

<style lang="scss">
  main {
    height: 100%;
    background: #000;

    &.cursor {
      cursor: pointer;
    }
  }
</style>