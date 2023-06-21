<script lang="ts">
    import {Canvas} from "@threlte/core";
    import World from "$lib/World.svelte";
</script>

<Canvas>
    <World>
        <slot/>
    </World>
</Canvas>