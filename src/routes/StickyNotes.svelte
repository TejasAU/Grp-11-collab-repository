<script>
    export let top=100;
    export let left= 200;
    export let content;
    // console.log(`inside stickyNotes component ${top},${left}`);
</script>

<div class="stickyNotes" style="--y_coordinate:{top}px ; --x_coordinate:{left}px">
{content}
</div>

<style>
    .stickyNotes{
        top: var(--y_coordinate);
        left: var(--x_coordinate);
        /* top: 10px;
        left: 10px; */
        position: absolute;
        width: 2rem;
        height: 5rem;
        background-color: red;
    }
</style>