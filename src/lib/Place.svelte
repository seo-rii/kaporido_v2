<script lang="ts" context="module">
    import {MeshStandardMaterial} from "three";

    const material = new MeshStandardMaterial({
        color: 0xf2f2f2,
        roughness: 0.7,
        metalness: 0.4,
        emissive: 0xdddddd,
        emissiveIntensity: 0.38,
        side: 2,
        transparent: true,
        opacity: 0.8,
    });
</script>
<script lang="ts">
    import {T} from "@threlte/core"
    import {getContext} from "svelte";

    const MAP_SIZE = getContext('MAP_SIZE');
    const BOARD_SIZE = getContext('BOARD_SIZE');
    export let x = 0, y = 0;

    $: _s = MAP_SIZE / BOARD_SIZE * 0.8;
    $: _x = (x - (BOARD_SIZE - 1) / 2) / BOARD_SIZE * MAP_SIZE;
    $: _y = (y - (BOARD_SIZE - 1) / 2) / BOARD_SIZE * MAP_SIZE;
</script>

<T.Mesh position.y={0.1} castShadow {material} position={[_x, 0.151, _y]}>
    <T.BoxGeometry args={[_s, 0.3, _s]}/>
</T.Mesh>