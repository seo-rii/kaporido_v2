<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";
    import {Color, MeshPhysicalMaterial, MeshStandardMaterial, BoxGeometry, BufferGeometry} from "three";
    import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
    import {tweened} from "svelte/motion";
    import {cubicOut, quadInOut, quadOut, quartInOut} from "svelte/easing";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    const selectable = getContext('selectable');
    const KAIST_COLOR = new Color(0xed4434);
    const POSTECH_COLOR = new Color(0x3d8ad6);
    const HIGHLIGHT_COLOR = new Color(0x00ff00);
    const hgl = tweened(0, {duration: 100});

    export let x = 0, y = 0, d = 0, i = 0, kaist = false, postech = false;
    let hover, material, geometry;

    function gx(x: number, d: number) {
        return x - 0.5;
    }

    function gy(y: number, d: number) {
        return y - 0.5;
    }

    let _x = tweened(gx(x, d), {easing: quadInOut, duration: 1600}),
        _y = tweened(gy(y, d), {easing: quadInOut, duration: 1600});
    let z = tweened(3.31, {easing: quartInOut, duration: 1000});
    let op = tweened(0, {easing: quartInOut, duration: 1000});
    setTimeout(() => z.set(0.31 + i * 0.001, {easing: cubicOut, duration: 1500}), i * 100);
    setTimeout(() => op.set(1), Math.pow(i, 0.7) * 300 + 300);
    let r = tweened((1 - d) * Math.PI / 2, {easing: quartInOut, duration: 1000});

    $: _l = MAP_SIZE / BOARD_SIZE;
    $: _w = MAP_SIZE / BOARD_SIZE * 0.16;
    $: $_x = gx(x, d);
    $: $_y = gy(y, d);
    $: __x = ($_x - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;
    $: __y = ($_y - (BOARD_SIZE) / 2) / BOARD_SIZE * MAP_SIZE;
    $: $hgl = hover ? 0.5 : 0;
    $: $r = (1 - d) * Math.PI / 2;
    let internal = false

    $: {
        const geo1 = new BoxGeometry(_l - _w, 0.6, _w);
        const geo2 = new BoxGeometry(_l - _w /4, 0.6, _w);
        geo1.translate(0, 0, -_l / 2 + _w / 4);
        geo2.translate(_w / 8 * 3, 0, -_l / 2 );
        geo2.rotateY(Math.PI / 2);
        geometry = BufferGeometryUtils.mergeGeometries([geo1, geo2], false);
    }

    $: {
        if (3 <= $_x && $_x <= 6 && 3 <= $_y && $_y <= 6) internal = true;
        else internal = false;
    }

    $: {
        if (material) material.dispose();
        let emissive = new Color(0xffffff).clone().lerp(kaist ? POSTECH_COLOR : KAIST_COLOR, $op);
        emissive.lerp(HIGHLIGHT_COLOR, $hgl);
        material = new MeshPhysicalMaterial({
            color: 0x8f34eb,
            roughness: 0.033,
            transmission: 0.8,
            thickness: 1,
            emissive,
            emissiveIntensity: (1.48 + $hgl * 4) * 0.8 * $op,
            opacity: $op,
            transparent: $op !== 1
        });
    }

    let px = x, py = y;
    $: if (px !== x || py !== y) {
        px = x;
        py = y;
        z.set(2.2 + i * 0.001, {easing: quadOut, duration: 1000});
        setTimeout(() => z.set(0.31 + i * 0.001, {easing: quartInOut, duration: 1500}), 900);
    }
</script>

<T.Mesh castShadow {material} position={[__y, $z, __x]} rotation.y={$r}
        on:pointerenter={() => {hover = true;$selectable++;}} on:pointerleave={() =>{ hover = false;$selectable--;}}>
    <T is={geometry}/>
</T.Mesh>
{#if internal}
    <T.Mesh castShadow position={[__y, $z, __x]} rotation.y={$r}>
        <T.MeshBasicMaterial color={kaist ? POSTECH_COLOR : KAIST_COLOR}/>
        <T is={geometry}/>
    </T.Mesh>
{:else}
    <T.Mesh castShadow position={[__y, $z, __x]} rotation.y={$r}>
        <T.MeshBasicMaterial color={kaist ? KAIST_COLOR : POSTECH_COLOR} transparent opacity={0.16}/>
        <T is={geometry}/>
    </T.Mesh>
{/if}