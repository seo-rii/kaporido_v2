<script lang="ts">
    import {T} from "@threlte/core"
    import {Color, MeshPhysicalMaterial} from "three";

    const KAIST_COLOR = new Color(0xed4434);
    const POSTECH_COLOR = new Color(0x3d8ad6);

    export let x = 0, y = 0, kaist = false, postech = false;
    let material;

    $: {
        if (material) material.dispose();
        let emissive = kaist ? POSTECH_COLOR : KAIST_COLOR;
        material = new MeshPhysicalMaterial({
            color: 0x8f34eb,
            roughness: 0.033,
            transmission: 0.8,
            thickness: 1,
            emissive,
            emissiveIntensity: (1.48) * 0.8
        });
    }
</script>



