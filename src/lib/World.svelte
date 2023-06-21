<script lang="ts">
    import {interactivity, OrbitControls} from "@threlte/extras";
    import {T} from '@threlte/core';

    interactivity();
</script>

<T.PerspectiveCamera makeDefault position.x={10} position.y={10} position.z={10}>
    <OrbitControls enableDamping/>
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]}/>
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2}/>
<T.AmbientLight intensity={0.2}/>
<slot/>
