<script lang="ts">
    import {T, useFrame} from "@threlte/core"
    import {GLTF} from "@threlte/extras";
    import {tweened} from "svelte/motion";
    import {cubicIn, cubicInOut, quadInOut, quadOut, quartInOut} from "svelte/easing";
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
    let __z = 0, material;
    let _x = tweened(gx(x), {easing: quadInOut, duration: 1600}),
        _y = tweened(gy(y), {easing: quadInOut, duration: 1600});
    let z = tweened(0.45, {easing: quartInOut, duration: 1000});

    $: $_x = gx(x);
    $: $_y = gy(y);
    $: __x = ($_x - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;
    $: __y = ($_y - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;
    let px = x, py = y;

    $: if (px !== x || py !== y) {
        px = x;
        py = y;
        z.set(2.2, {easing: cubicIn, duration: 400});
        setTimeout(() => z.set(0.45, {easing: quartInOut, duration: 1500}), 300);
    }

    useFrame(() => {
        __z = $z + 0.1 * Math.sin((Date.now() - t) / 500) * (kaist ? 1 : -1);
    });
</script>

{#if postech}
    <GLTF url="/ponix.gltf" castShadow recieveShadow position.x={__y} position.y={__z} position.z={__x}
          rotation.y={-Math.PI / 2}/>
    <T.SpotLight castShadow position.x={__y + 5} position.y={__z + 5} position.z={__x} lookAt={[__y + 5, __z, __x]}
                 intensity={9.9} color="#ed4434" penumbra={0.2} angle={0.2} decay={2} distance={20}/>
{:else}
    <GLTF url="/nupjuk.gltf" castShadow recieveShadow position.x={__y} position.y={__z} position.z={__x}
          rotation.y={Math.PI / 2}/>
    <T.SpotLight castShadow position.x={__y - 5} position.y={__z + 5} position.z={__x} lookAt={[__y - 5, __z, __x]}
                 intensity={9.9} color="#2d8ad6" penumbra={0.2} angle={0.2} decay={2} distance={20}/>
{/if}
