<script lang="ts">
    import {interactivity, OrbitControls} from "@threlte/extras";
    import {T} from '@threlte/core';
    import lookAt from "$lib/lookAt";
    import Camera from "$lib/Camera.svelte";

    interactivity();
    lookAt();
</script>

<Camera/>
<T.SpotLight castShadow position={[20, 18, 0]} intensity={0.2} color="#ed4434" angle={0.2} penumbra={0.2}/>
<T.SpotLight castShadow position={[-20, 18, 0]} intensity={0.2} color="#2d8ad6" angle={0.2} penumbra={0.2}/>
<T.SpotLight castShadow position={[-16, 28, 0]} intensity={0.1} color="#ed4434" angle={0.2} penumbra={0.2}/>
<T.SpotLight castShadow position={[16, 28, 0]} intensity={0.1} color="#2d8ad6" angle={0.2} penumbra={0.2}/>
<T.SpotLight castShadow position={[20, 10, 0]} intensity={0.1} color="#ddd" angle={0.2} penumbra={0.2}/>
<T.SpotLight castShadow position={[-20, 10, 0]} intensity={0.1} color="#ddd" angle={0.2} penumbra={0.2}/>

<T.SpotLight castShadow position={[20, 6, 0]} lookAt={[20, 0, 0]} intensity={0.2} color="#ed4434" angle={0.2}
             penumbra={0.2}/>
<T.SpotLight castShadow position={[-20, 6, 0]} lookAt={[-20, 0, 0]} intensity={0.2} color="#2d8ad6" angle={0.2}
             penumbra={0.2}/>
<T.AmbientLight intensity={0.3}/>
<slot/>
