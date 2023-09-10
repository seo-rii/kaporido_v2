<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";
    import {Color, MeshPhysicalMaterial, MeshStandardMaterial} from "three";
    import {tweened} from "svelte/motion";
    import {circInOut, cubicOut, quadInOut, quadOut, quartInOut} from "svelte/easing";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    const selectable = getContext('selectable');
    const KAIST_COLOR = new Color(0xed4434);
    const POSTECH_COLOR = new Color(0x3d8ad6);
    const HIGHLIGHT_COLOR = new Color(0x00ff00);
    const hgl = tweened(0, {duration: 100});

    export let x = 0, y = 0, d = 0, kaist, postech;
    let hover, material;

    function gx(x: number, d: number) {
        if (d === 1) return (x - (BOARD_SIZE + 2) / 2) / BOARD_SIZE * MAP_SIZE;
        if (d === 2) return (x - (BOARD_SIZE - 0) / 2) / BOARD_SIZE * MAP_SIZE;
        return -1;
    }

    function gy(y: number, d: number) {
        if (d === 1) return (y - (BOARD_SIZE - 0) / 2) / BOARD_SIZE * MAP_SIZE;
        if (d === 2) return (y - (BOARD_SIZE + 2) / 2) / BOARD_SIZE * MAP_SIZE;
        return -1;
    }

    let _x = tweened(gx(x, d), {easing: quadInOut, duration: 2000}),
        _y = tweened(gy(y, d), {easing: quadInOut, duration: 2000});
    let z = tweened(3.31, {easing: quartInOut, duration: 1000});
    z.set(0.31, {easing: cubicOut, duration: 1500});
    let r = tweened((d - 1) * Math.PI / 2, {easing: quartInOut, duration: 1000});

    $: _l = MAP_SIZE / BOARD_SIZE * 2;
    $: _w = MAP_SIZE / BOARD_SIZE * 0.16;
    $: $_x = gx(x, d);
    $: $_y = gy(y, d);
    $: $hgl = hover ? 0.5 : 0;
    $: $r = (d - 1) * Math.PI / 2;

    $: {
        if (material) material.dispose();
        let emissive = (kaist ? POSTECH_COLOR : KAIST_COLOR).clone();
        emissive.lerp(HIGHLIGHT_COLOR, $hgl);
        material = true ? new MeshPhysicalMaterial({
            color: kaist ? 0x8f34eb : 0x8f34eb,
            roughness: 0.43,
            transmission: 1,
            thickness: 1,
            emissive,
            emissiveIntensity: (1.48 + $hgl * 4) * 0.8,
        }) : new MeshStandardMaterial({
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

    let px = x, py = y;
    $: if (px !== x || py !== y) {
        px = x;
        py = y;
        z.set(2.2, {easing: quadOut, duration: 1000});
        setTimeout(() => z.set(0.31, {easing: quartInOut, duration: 1500}), 500);
    }
</script>

<T.Mesh position.y={0.1} castShadow {material} position={[$_y, $z, $_x]} rotation.y={$r}
        on:pointerenter={() => {hover = true;$selectable++;}} on:pointerleave={() =>{ hover = false;$selectable--;}}>
    <T.BoxGeometry args={[_l, 0.6, _w]}/>
</T.Mesh>
<T.Mesh position.y={0.1} castShadow position={[$_y, $z, $_x]} rotation.y={$r}>
    <T.MeshBasicMaterial color={kaist ? POSTECH_COLOR : KAIST_COLOR}/>
    <T.BoxGeometry args={[_l, 0.6, _w]}/>
</T.Mesh>