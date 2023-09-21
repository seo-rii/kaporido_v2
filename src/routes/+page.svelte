<script lang="ts">
    import pw, {encrypt} from "$lib/pw";
    import {browser} from "$app/environment";

    if (browser) window.enc = encrypt;
</script>

<input bind:value={$pw} placeholder="비밀번호" type="password"/>
<p>비밀번호를 입력하고 실제 게임에 들어갔을 때 검은 화면이 뜨면 성공. 클릭 시 게임 시작</p>
<p>실제 게임을 열람하는 것은 비밀유지서약서에 동의한 사람만이 허용됨</p>
<h2>실제 게임</h2>
{#each {length: 5} as _, i}
    <p><a href="/kaporido_v2/real/r{i+1}">라운드 {i + 1}</a></p>
{/each}
<hr>
<h2>테스트 1</h2>
{#each {length: 5} as _, i}
    <p><a href="/kaporido_v2/test/r{i+1}?fast">라운드 {i + 1}</a></p>
{/each}
<h2>테스트 2</h2>
{#each {length: 2} as _, i}
    <p><a href="/kaporido_v2/t2/r{i+1}?fast">라운드 {i + 1}</a></p>
{/each}
<h2>테스트 3</h2>
{#each {length: 4} as _, i}
    <p><a href="/kaporido_v2/t3/r{i+1}?fast">라운드 {i + 1}</a></p>
{/each}