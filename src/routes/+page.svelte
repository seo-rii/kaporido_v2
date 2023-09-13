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

<div class="turn kaist" class:current={!(round % 2)}>
    KAIST
</div>
<div class="turn postech" class:current={(round % 2)}>
    POSTECH
</div>
<img class="avatar" class:current={!(round % 2)} src="/kaporido_v2/nupjuk.jpeg">
<img class="avatar" class:current={(round % 2)} src="/kaporido_v2/ponix.webp">
<Board bind:round bind:blocker act on:act={next}/>

<style lang="scss">
  .turn {
    position: fixed;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
    width: 220px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    opacity: 0.3;
    transition: all 0.3s ease-in-out;
    top: 140px;
    font-weight: 200;
    user-select: none;

    &.current {
      top: 0;
      opacity: 1;
      height: 120px;
      font-weight: 500;
    }

    &.kaist {
      background-color: #437cf6;
      color: white;
    }

    &.postech {
      background-color: #ef43a4;
      color: white;
    }
  }

  .avatar {
    position: fixed;
    width: 100px;
    height: 100px;
    top: 100px;
    left: 210px;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    border-radius: 12px;
    user-select: none;

    &.current {
      top: 50px;
      opacity: 1;
    }
  }
</style>