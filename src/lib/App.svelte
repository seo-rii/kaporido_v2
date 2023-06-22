<script lang="ts">
    import {Canvas, T} from "@threlte/core";
    import World from "$lib/World.svelte";
    import {setContext} from "svelte";
    import {writable} from "svelte/store";
    import Effect from "$lib/Effect.svelte";

    const scene = setContext('scene', writable(undefined));
</script>

<Canvas>
    <T.Scene bind:ref={$scene}>
        <World>
            <slot/>
        </World>
    </T.Scene>
    <Effect/>
</Canvas>