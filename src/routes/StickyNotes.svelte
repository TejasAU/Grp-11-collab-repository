<script>
    export let top=100;
    export let left= 200;
    export let content;
    // console.log(`inside stickyNotes component ${top},${left}`);
</script>

<div class="stickyNotes" style="--y_coordinate:{top}px ; --x_coordinate:{left}px">
    <p></p>
    <textarea class="stickyDesc" rows="9" cols="19"></textarea>
    <hr style="margin: 0 0 0 0 ;"/>
</div>

<style>
    .stickyNotes{
        top: var(--y_coordinate);
        left: var(--x_coordinate);
        /* top: 10px;
        left: 10px; */
        position: absolute;
        width: 10rem;
        height: 11.5rem;
        border-radius: 0.25rem;
        background-color: white;
        overflow: hidden;
        box-shadow: 5px 5px 10px #ccc;
    }
    .stickyNotes:hover{
        box-shadow: 10px 10px 20px #ccc;
    }
    .stickyDesc{
        border: none;
        /* overflow: inherit; */
        outline: none;
        resize: none;
    }
    .stickyDesc:focus{
        box-shadow: none;
    }
</style>