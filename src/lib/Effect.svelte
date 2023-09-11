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
    const MAX_Z = 2.4, MAX_X = 3.7, FOCUS = 0.00157, UNBLUR = 0.019;
    let dof = null, bloom = null, target = new Vector3(0, 0.2, 0), perf = 1020;

    const setupEffectComposer = (camera) => {
        composer.removeAllPasses()
        composer.addPass(new RenderPass(scene, camera))
        composer.addPass(new EffectPass(camera, dof = new DepthOfFieldEffect(camera, {
            focusDistance: 0.0,
            focusRange: FOCUS,
            bokehScale: 4.0,
            height: perf,
        }), bloom = new BloomEffect({
            intensity: 3,
            luminanceThreshold: 1,
            height: perf,
            luminanceSmoothing: 0.08,
            mipmapBlur: true,
            kernelSize: KernelSize.VERY_SMALL
        })))
        composer.addPass(new EffectPass(camera, new SMAAEffect({preset: SMAAPreset.ULTRA})))
    }

    $: setupEffectComposer($camera)
    useRender((_, delta) => composer.render(delta))
    useFrame(() => {
        if (dof) {
            const pos = camera.current.position.clone();
            pos.y = 0;
            if (Math.abs(pos.x) > MAX_X || Math.abs(pos.z) > MAX_Z) {
                const factor = Math.max(Math.abs(pos.x) / MAX_X, Math.abs(pos.z) / MAX_Z);
                pos.x /= factor;
                pos.z /= factor;
            }
            dof.target = pos;
            const factor = (Math.min(1, Math.pow(Math.abs(pos.z) / MAX_Z * 1.8, 0.3)));
            dof.cocMaterial.focusRange = UNBLUR - (UNBLUR - FOCUS) * factor;
        }
    })
</script>
