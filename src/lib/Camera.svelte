<script lang="ts">
    import {T, useThrelte} from '@threlte/core';
    import {tweened} from "svelte/motion";
    import {expoOut} from "svelte/easing";
    import {createEventDispatcher, onMount} from "svelte";

    export let round = 0, dragged = false;

    const dispatch = createEventDispatcher();
    const rotation = tweened(-Math.PI, {duration: 1000, easing: expoOut});
    const cameraZ = tweened(0, {duration: 100, easing: expoOut});

    const _cameraP1 = tweened(0, {duration: 2000, easing: expoOut}),
        _cameraP2 = tweened(5, {duration: 2000, easing: expoOut}),
        _cameraP3 = tweened(0, {duration: 2000, easing: expoOut});

    const r = 8.8;
    $: [$_cameraP1, $_cameraP2, $_cameraP3] =
        [r * Math.exp(-$cameraZ) * Math.cos($rotation) + 0.2, -9.5 + 15 * Math.exp(0.5 * Math.sin($cameraZ)), r * Math.exp(-$cameraZ) * Math.sin($rotation)];

    let click = false, drag = false, lastX = 0, lastY = 0, initX = 0, initY = 0,
        cursor = {x: 0, y: 0};

    const mouseDownHandler = (e: MouseEvent) => {
        click = true;
        drag = true;
        lastX = e.clientX;
        lastY = e.clientY;
        initX = e.clientX;
        initY = e.clientY;
    }

    const mouseMoveHandler = (e: MouseEvent) => {
        if (drag) {
            if (Math.abs(initX - e.clientX) > 20 || Math.abs(initY - e.clientY) > 20) {
                click = false;
                dragged = true;
            }

            $rotation += (e.clientX - lastX) / 100;
            lastX = e.clientX;

            cursor = {x: e.clientX, y: e.clientY};
            $cameraZ = Math.min(Math.max($cameraZ + (e.clientY - lastY) / 50, 0), Math.PI * 0.85);
            if (!$cameraZ) $cameraZ = 0;
            lastY = e.clientY;
            dragged = true;
        }
    }

    const mouseUpHandler = () => {
        if (click && dragged) {
            round++;
            round--;
            setTimeout(() => dragged = false, 100);
        }
        drag = false;
    }

    const touchStartHandler = (e: TouchEvent) => {
        click = true;
        drag = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        initX = e.touches[0].clientX;
        initY = e.touches[0].clientY;
    }

    const touchMoveHandler = (e: TouchEvent) => {
        if (drag) {
            if (Math.abs(initX - e.touches[0].clientX) > 20 || Math.abs(initY - e.touches[0].clientY) > 20) {
                click = false;
                dragged = true;
            }

            $rotation += (e.touches[0].clientX - lastX) / 100;
            lastX = e.touches[0].clientX;

            cursor = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            $cameraZ = Math.min(Math.max($cameraZ + (e.touches[0].clientY - lastY) / 50, 0), Math.PI * 0.85);
            lastY = e.touches[0].clientY;
            dragged = true;
        }
    }

    const touchEndHandler = () => {
        if (click && dragged) {
            round++;
            round--;
            setTimeout(() => dragged = false, 100);
        }
        drag = false;
    }

    let f = false;

    const clickHandler = () => click && !dragged && dispatch('act');

    const {renderer: {domElement: target}} = useThrelte();

    $: {
        rotation.set((round - 1) * Math.PI, {duration: 3000, easing: expoOut});
        $cameraZ = 0.35;
    }

    onMount(() => {
        target.addEventListener('mousedown', mouseDownHandler, {passive: true});
        target.addEventListener('mousemove', mouseMoveHandler, {passive: true});
        target.addEventListener('mouseup', mouseUpHandler, {passive: true});
        target.addEventListener('touchstart', touchStartHandler, {passive: true});
        target.addEventListener('touchmove', touchMoveHandler, {passive: true});
        target.addEventListener('touchend', touchEndHandler, {passive: true});
        target.addEventListener('click', clickHandler, {passive: true});

        return () => {
            target.removeEventListener('mousedown', mouseDownHandler);
            target.removeEventListener('mousemove', mouseMoveHandler);
            target.removeEventListener('mouseup', mouseUpHandler);
            target.removeEventListener('touchstart', touchStartHandler);
            target.removeEventListener('touchmove', touchMoveHandler);
            target.removeEventListener('touchend', touchEndHandler);
            target.removeEventListener('click', clickHandler);
        }
    });
</script>

<T.PerspectiveCamera makeDefault position.x={$_cameraP1} position.y={$_cameraP2} position.z={$_cameraP3}
                     lookAt={[0, 0, 0]}/>
