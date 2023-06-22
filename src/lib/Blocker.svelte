<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";
    import {Color, MeshStandardMaterial} from "three";
    import {tweened} from "svelte/motion";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    const selectable = getContext('selectable');
    const KAIST_COLOR = new Color(0xed4434);
    const POSTECH_COLOR = new Color(0x2d8ad6);
    const HIGHLIGHT_COLOR = new Color(0x00ff00);
    const hgl = tweened(0, {duration: 100});

    export let x = 0, y = 0, kaist, postech;
    let hover, material;

    $: _l = MAP_SIZE / BOARD_SIZE * 2;
    $: _w = MAP_SIZE / BOARD_SIZE * 0.16;
    $: _x = (x - (BOARD_SIZE - 0) / 2) / BOARD_SIZE * MAP_SIZE;
    $: _y = (y - (BOARD_SIZE - 2) / 2) / BOARD_SIZE * MAP_SIZE;
    $: $hgl = hover ? 0.5 : 0;

    $: {
        if (material) material.dispose();
        let emissive = (kaist ? POSTECH_COLOR : KAIST_COLOR).clone();
        emissive.lerp(HIGHLIGHT_COLOR, $hgl);
        material = new MeshStandardMaterial({
            color: kaist ? KAIST_COLOR : POSTECH_COLOR,
            roughness: 0.2,
            metalness: 0.7,
            emissive,
            emissiveIntensity: 1.48 + $hgl * 4,
            side: 2,
            transparent: true,
            opacity: 0.7,
        });
    }
</script>

<T.Mesh position.y={0.1} castShadow {material} position={[_y, 0.31, _x]}
        on:pointerenter={() => {hover = true;$selectable++;}} on:pointerleave={() =>{ hover = false;$selectable--;}}>
    <T.BoxGeometry args={[_l, 0.6, _w]}/>
</T.Mesh>