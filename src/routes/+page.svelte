<h2>테스트 1</h2>
{#each {length: 5} as _, i}
    <p><a href="/kaporido_v2/test/r{i+1}?fast">라운드 {i + 1}</a></p>
{/each}
<h2>테스트 2</h2>
{#each {length: 2} as _, i}
    <p><a href="/kaporido_v2/t2/r{i+1}?fast">라운드 {i + 1}</a></p>
{/each}