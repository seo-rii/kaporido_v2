<script>
    import App from "$lib/App.svelte"
    import {T} from '@threlte/core'
    import './global.css'
    import {degToRad} from "three/src/math/MathUtils.js"
    import Place from "$lib/Place.svelte"
    import {setContext} from "svelte"
    import Blocker from "$lib/Blocker.svelte";


    const MAP_SIZE = setContext('MAP_SIZE', 6)
    const BOARD_SIZE = setContext('BOARD_SIZE', 9)
</script>

<App>
    <T.Mesh receiveShadow rotation.x={degToRad(-90)}>
        <T.CircleGeometry args={[8, 72]}/>
        <T.MeshStandardMaterial color="#333"/>
    </T.Mesh>
    <T.Mesh position.y={0.1} castShadow>
        <T.BoxGeometry args={[6.2, 0.2, 6.2]}/>
        <T.MeshStandardMaterial color="#666" metalness={0.6} roughness={0.46}/>
    </T.Mesh>
    {#each {length: BOARD_SIZE} as _, x}
        {#each {length: BOARD_SIZE} as _, y}
            <Place {x} {y}/>
        {/each}
    {/each}

    {#each {length: BOARD_SIZE + 1} as _, x}
        <Blocker kaist x={x}/>
    {/each}

    {#each {length: BOARD_SIZE + 1} as _, x}
        <Blocker postech x={x} y={7}/>
    {/each}
</App>
