<script lang="ts" context="module">
    import {MeshStandardMaterial} from "three";

    const kMaterial = new MeshStandardMaterial({
        color: 0xed4434,
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0x2d8ad6,
        emissiveIntensity: 1.48,
        side: 2,
        transparent: true,
        opacity: 0.7,
    });

    const pMaterial = new MeshStandardMaterial({
        color: 0x2d8ad6,
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0xed4434,
        emissiveIntensity: 1.48,
        side: 2,
        transparent: true,
        opacity: 0.7,
    });
</script>
<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    export let x = 0, y = 0, kaist, postech;

    $: _l = MAP_SIZE / BOARD_SIZE * 2;
    $: _w = MAP_SIZE / BOARD_SIZE * 0.16;
    $: _x = (x - (BOARD_SIZE - 0) / 2) / BOARD_SIZE * MAP_SIZE;
    $: _y = (y - (BOARD_SIZE - 2) / 2) / BOARD_SIZE * MAP_SIZE;
</script>

<T.Mesh position.y={0.1} castShadow material={kaist ? kMaterial : pMaterial} position={[_y, 0.31, _x]}>
    <T.BoxGeometry args={[_l, 0.6, _w]}/>
</T.Mesh>