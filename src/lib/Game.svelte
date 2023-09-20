<script lang="ts">
    import Board from "$lib/mr/Board.svelte";
    import {onMount} from "svelte";
    import {fly} from "svelte/transition";
    import {page} from "$app/stores";

    export let actions = [], p2 = false;

    let round = p2 ? 1 : 0, blocker = {kaist: {i: [], l: []}, potek: {i: [], l: []}}, dragged = false, f = false,
        win = null, nxt = false, r = false;
    $: turn = round % 2 ? "POSTECH" : "KAIST";
    let position = {kaist: [5, 1], potek: [5, 9]}, timer = 30000;

    const ACTION_MOVE = 1, ACTION_PLACE_I = 2, ACTION_PLACE_L = 3, GAME_FIN = 0;

    async function act(...args: any[]) {
        if (r) return;
        r = true;
        const [type, x, y, w] = args;
        const t = args.slice(-1)[0] * 1000, c = Date.now();
        if(!$page.url.searchParams.get('fast')) await new Promise(r => {
            const intv = setInterval(() => {
                const el = Date.now() - c;
                timer = 30000 - el;
                if (el >= t) {
                    clearInterval(intv);
                    r(null);
                }
            }, 100);
        });
        const target = round % 2 ? blocker.potek : blocker.kaist;
        if (type === ACTION_MOVE) {
            if (round % 2) {
                position.potek = [x, y];
            } else {
                position.kaist = [x, y];
            }
        }
        if (type === ACTION_PLACE_I) {
            for (const i of target.i) {
                if (i[1] >= 1 && i[1] <= 9) continue;
                i[0] = x;
                i[1] = y;
                i[2] = w;
                break;
            }
        }
        if (type === ACTION_PLACE_L) {
            for (const i of target.l) {
                if (i[1] >= 1 && i[1] <= 9) continue;
                i[0] = x;
                i[1] = y;
                i[2] = w;
                break;
            }
        }
        if (type === GAME_FIN) {
            win = [x, y];
        }
        blocker = blocker;
        nxt = true;
        r = false;
    }

    function next() {
        if (!act || f) {
            f = false;
            nxt = false;
            timer = 30000;
            round++;
            setTimeout(next, 1200);
        } else {
            f = true;
            act(...actions[round]);
        }
    }

    onMount(() => {
        for (let i = 1; i <= 7; i++) {
            const x = 5 * i / 7 + 0.5
            blocker.kaist.i.push([x, -1.2, 1])
            blocker.potek.i.push([x, 9 + 1.2, 1])
        }
        for (let i = 1; i <= 3; i++) {
            const x = 9 * i / 7 + 5
            blocker.kaist.l.push([x, -0.7, 1.5])
            blocker.potek.l.push([x - 0.5, 9 + 1.7, -0.5])
        }
    })
</script>

{#if win}
    <div in:fly style="position: fixed;width: 100%;height: 100%;background: #00000055"></div>
    <div class="win" in:fly={{x: 100}}>
        {#if win[0] === 1}
            <img src="/kaporido_v2/nupjuk.jpeg" style="width: 120px;height: 120px;border-radius: 12px">
        {:else}
            <img src="/kaporido_v2/ponix.webp" style="width: 120px;height: 120px;border-radius: 12px">
        {/if}
        <div style="font-size: 3em;color: white;margin: 1em 0 0.4em 0">{['', 'KAIST', 'POSTECH'][win[0]]} 승리!</div>
        <p style="font-size: 1.2em;color: white;margin: 0">
            {#if win[1] === 1}
                우승 조건 달성
            {:else if win[1] === 2}
                상대 팀 실격
            {/if}
        </p>
    </div>
{/if}
<div class="turn kaist" class:current={!((round) % 2)}>
    KAIST
</div>
<div class="turn postech" class:current={(round % 2)}>
    POSTECH
</div>
<div class="timer">
    <div class="inner" style:width="{timer / 300}%"></div>
    <span>{(timer / 1000).toFixed(1)}초 남음</span>
</div>
<div style="position: fixed;left: 26px;top: 26px;color: white;font-size: 20px">#{Math.floor((round - p2) / 2) + 1}</div>
<img class="avatar" class:current={!(round % 2)} src="/kaporido_v2/nupjuk.jpeg">
<img class="avatar" class:current={(round % 2)} src="/kaporido_v2/ponix.webp">

<div class="notify" class:show={dragged}>아무 곳이나 눌러서 돌아가기</div>
<div class="notify" class:show={!dragged && nxt && !win}>다음</div>

<Board bind:round bind:position bind:blocker bind:dragged on:act={next}/>

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
      background-color: #437cf6cc;
      color: white;
    }

    &.postech {
      background-color: #ef43a4cc;
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

  .notify {
    opacity: 0;
    position: fixed;
    margin: 1rem;
    bottom: 0;
    background: #77777755;
    color: #ffffff;
    user-select: none;
    transition: all 0.3s ease-in-out;
    padding: 0.5rem;
    font-size: 1.2em;
    border-radius: 12px;

    &.show {
      opacity: 1;
    }
  }

  .win {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 40%;
    background: #000000cc;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .timer {
    position: fixed;
    right: 0;
    top: 0;
    width: 120px;
    background: #888888cc;
    margin: 1rem;
    padding: 0.5rem;
    font-size: 1.2em;
    border-radius: 12px;
    overflow: hidden;

    .inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #ffffff;
      border-radius: 12px;
      transition: all 0.3s ease-in-out;
    }

    span {
      position: relative;
      z-index: 1;
    }
  }
</style>