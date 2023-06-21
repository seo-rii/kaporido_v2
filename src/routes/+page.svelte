<script>
    import App from "$lib/App.svelte";
    import {T} from '@threlte/core';
    import {spring} from "svelte/motion";
    import './global.css';
    import {degToRad} from "three/src/math/MathUtils.js";

    let sc = spring(1);
</script>

<App>
    <T.Mesh position.y={0.5} castShadow let:ref
            on:pointerenter={() => $sc = 2} on:pointerleave={() => $sc = 1}>
        <T.BoxGeometry args={[$sc, 1, $sc]}/>
        <T.MeshStandardMaterial color="#333333"/>
    </T.Mesh>
    <T.Mesh receiveShadow rotation.x={degToRad(-90)}>
        <T.CircleGeometry args={[3, 72]}/>
        <T.MeshStandardMaterial color="white"/>
    </T.Mesh>
</App>
