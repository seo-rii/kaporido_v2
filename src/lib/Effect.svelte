<script>
    import {useThrelte, useRender, useFrame} from '@threlte/core'
    import {
        EffectComposer,
        EffectPass,
        RenderPass,
        SMAAEffect,
        SMAAPreset,
        BloomEffect,
        KernelSize, DepthOfFieldEffect,

    } from 'postprocessing'
    import {Vector3} from "three";

    const {scene, renderer, camera} = useThrelte()
    const composer = new EffectComposer(renderer)
    const MAX_POS = 2.4, FOCUS = 0.0014;
    let dof = null, target = new Vector3(0, 0.2, 0), perf = 620;

    const setupEffectComposer = (camera) => {
        composer.removeAllPasses()
        composer.addPass(new RenderPass(scene, camera))
        composer.addPass(new EffectPass(camera, dof = new DepthOfFieldEffect(camera, {
            focusDistance: 0.0,
            focusRange: FOCUS,
            bokehScale: 4.0,
            height: perf
        }), new BloomEffect({
            intensity: 4,
            luminanceThreshold: 1,
            height: perf,
            width: perf,
            luminanceSmoothing: 0.08,
            mipmapBlur: true,
            kernelSize: KernelSize.VERY_SMALL
        })))
        composer.addPass(new EffectPass(camera, new SMAAEffect({preset: SMAAPreset.MEDIUM})))
    }

    $: setupEffectComposer($camera)
    useRender((_, delta) => composer.render(delta))
    useFrame(() => {
        if (dof) {
            const pos = camera.current.position.clone();
            pos.y = 0;
            if (Math.abs(pos.x) > MAX_POS || Math.abs(pos.z) > MAX_POS) {
                const factor = Math.max(Math.abs(pos.x), Math.abs(pos.z)) / MAX_POS;
                pos.x /= factor;
                pos.z /= factor;
            }
            dof.target = pos;
            const factor = (Math.min(1, Math.pow(Math.abs(pos.z) / MAX_POS * 1.5, 0.3))), UNBLUR = 0.015;
            dof.cocMaterial.focusRange = UNBLUR - (UNBLUR - FOCUS) * factor;
        }
    })
</script>
