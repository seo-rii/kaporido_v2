<script lang="ts">
    import Board from "$lib/mr/Board.svelte";
    import {onMount} from "svelte";

    let round = 0, blocker = {kaist: {i: [], l: []}, potek: {i: [], l: []}};
    $: turn = round % 2 ? "POSTECH" : "KAIST";

    const ACTION_MOVE = 1, ACTION_PLACE_I = 2, ACTION_PLACE_L = 3;

    let actions = [
        [2, 1, 1, 1],
        [2, 1, 1, 2],
        [2, 1, 7, 1],
        [2, 5, 5, 1],
        [2, 6, 6, 2],
    ]

    function act(type, x, y, w) {
        const target = round % 2 ? blocker.potek : blocker.kaist;
        if (type === ACTION_PLACE_I) {
            for (const i of target.i) {
                if (i[1] >= 1 && i[1] <= 9) continue;
                i[0] = x;
                i[1] = y;
                i[2] = w;
                break;
            }
        }
        blocker = blocker;
    }

    function next() {
        act(...actions[round]);
    }

    onMount(() => {
        for (let i = 1; i <= 6; i++) {
            const x = 9 * i / 6
            blocker.kaist.i.push([x, -1.2, 1])
            blocker.potek.i.push([x, 9 + 1.2, 1])
        }
    })
</script>

<div class="turn">
    {turn} {round}
</div>
<Board bind:round bind:blocker act on:act={next}/>

<style lang="scss">
  .turn {
    position: fixed;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
    background: white;
    user-select: none;
  }
</style>