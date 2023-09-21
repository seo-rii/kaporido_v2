<script lang="ts">
    import pw, {encrypt, decrypt} from "$lib/pw";
    import {browser} from "$app/environment";
    import Game from "$lib/Game.svelte";
    import {fade} from "svelte/transition";

    export let data: any, p2 = false, r = 1;
    let dec: any, start = false;

    $:if (browser && $pw) {
        dec = decrypt(data, $pw);
    }
</script>

{#if dec}
    {#if start}
        <Game {p2} actions={dec}/>
    {:else}
        <main on:click={() => start = true} out:fade>
            <p>제 {r}라운드</p>
            <p>{p2 ? '포스텍' : '카이스트'} 선공</p>
        </main>
    {/if}
{:else}
    비밀번호가 틀려요.
{/if}

<style lang="scss">
  main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: black;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2em;
  }
</style>