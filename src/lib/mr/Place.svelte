<script lang="ts" context="module">
    import {MeshPhysicalMaterial} from "three";

    const materialX = new MeshPhysicalMaterial({
        color: 0x222222,
        roughness: 0.7,
        thickness: 0.1,
        metalness: 0.4,
        side: 2,
        emissive: 0xdddddd,
        emissiveIntensity: 0.38,
    });
</script>
<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";
    import {MeshBasicMaterial} from "three";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    export let x = 0, y = 0;
    $: internal = 3 <= x && x <= 5 && 3 <= y && y <= 5;

    $: _s = MAP_SIZE / BOARD_SIZE * 0.8;
    $: _x = (x - (BOARD_SIZE - 1) / 2) / BOARD_SIZE * MAP_SIZE;
    $: _y = (y - (BOARD_SIZE - 1) / 2) / BOARD_SIZE * MAP_SIZE;

    $: material = new MeshBasicMaterial({
        color: 0xf2f2f2,
        roughness: 0.7,
        metalness: 0.4,
        emissive: 0xdddddd,
        emissiveIntensity: 0.58,
        side: 2,
        transparent: !internal,
        opacity: 0.8,
    });
</script>

<T.Mesh castShadow {material} position={[_x, 0.251, _y]}>
    <T.BoxGeometry args={[_s, 0.2, _s]}/>
</T.Mesh>
<T.Mesh castShadow material={materialX} position={[_x, 0.101, _y]}>
    <T.BoxGeometry args={[_s, 0.2, _s]}/>
</T.Mesh>