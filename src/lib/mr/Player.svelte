<script lang="ts">
    import {T, useFrame} from "@threlte/core"
    import {GLTF} from "@threlte/extras";
    import {tweened} from "svelte/motion";
    import {quadInOut} from "svelte/easing";
    import {getContext} from "svelte";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    const t = Date.now();

    function gx(x: number) {
        return x - 0.5;
    }

    function gy(y: number) {
        return y - 0.5;
    }

    export let x = 0, y = 0, kaist = false, postech = false;
    let z = 0.5, material;
    let _x = tweened(gx(x), {easing: quadInOut, duration: 1600}),
        _y = tweened(gy(y), {easing: quadInOut, duration: 1600});

    $: $_x = gx(x);
    $: $_y = gy(y);
    $: __x = ($_x - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;
    $: __y = ($_y - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;

    useFrame(() => {
        z = 0.45 + 0.1 * Math.sin((Date.now() - t) / 500) * (kaist ? 1 : -1);
    })
</script>

{#if postech}
    <GLTF url="/ponix.gltf" position.x={__y} position.y={z} position.z={__x} rotation.y={-Math.PI / 2}/>
{:else}
    <GLTF url="/nupjuk.gltf" position.x={__y} position.y={z} position.z={__x} rotation.y={Math.PI / 2}/>
{/if}
