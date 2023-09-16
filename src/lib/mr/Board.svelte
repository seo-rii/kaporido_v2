<script>
    import App from "$lib/App.svelte"
    import {T} from '@threlte/core'
    import {degToRad} from "three/src/math/MathUtils.js"
    import Place from "$lib/mr/Place.svelte"
    import {setContext} from "svelte"
    import IBlocker from "$lib/mr/IBlocker.svelte";
    import LBlocker from "$lib/mr/LBlocker.svelte";
    import {tweened} from "svelte/motion";

    const MAP_SIZE = setContext('MAP_SIZE', 6)
    const BOARD_SIZE = setContext('BOARD_SIZE', 9)

    export let blocker,
        mask = true,
        round = 0,
        act = false

    const op = tweened(mask ? 0 : 1, {duration: 500})
    $: $op = mask ? 0 : 1;
</script>

<App bind:round {act} on:act>
    <T.Mesh receiveShadow rotation.x={degToRad(-90)}>
        <T.CircleGeometry args={[8, 72]}/>
        <T.MeshStandardMaterial color="#555"/>
    </T.Mesh>
    <T.Mesh position.y={0.1} castShadow>
        <T.BoxGeometry args={[8.2, 0.2, 6.2]}/>
        <T.MeshStandardMaterial color="#777" metalness={0.6} roughness={0.46}/>
        <!--        <T.MeshPhysicalMaterial color="#aaa" metalness={0.126} roughness={0.496} transmission={0.999} thickness={0.2}/>-->
    </T.Mesh>
    <T.Mesh position.y={0.61} castShadow
            on:pointerenter={() => {mask = false}} on:pointerleave={() =>{mask = true}}>
        <T.BoxGeometry args={[1.95, 1.2, 1.95]}/>
        <T.MeshPhysicalMaterial color="#aaa" metalness={0.026} roughness={0.396 * (1 - $op)}
                                transmission={(1 - $op * 2) * 0.999} thickness={0.2} transparent
                                opacity={1 - 0.6 * $op}/>
    </T.Mesh>

    {#each {length: BOARD_SIZE} as _, x}
        {#each {length: BOARD_SIZE} as _, y}
            <Place {x} {y}/>
        {/each}
    {/each}

    {#each blocker.kaist.i as [x, y, d], i(i)}
        <IBlocker kaist {x} {y} {d} {i}/>
    {/each}

    {#each blocker.potek.i as [x, y, d], i(i)}
        <IBlocker postech {x} {y} {d} {i}/>
    {/each}

    {#each blocker.kaist.l as [x, y, d], i(i)}
        <LBlocker kaist {x} {y} {d} i={i + 7}/>
    {/each}

    {#each blocker.potek.l as [x, y, d], i(i)}
        <LBlocker postech {x} {y} {d} i={i + 7}/>
    {/each}
</App>
