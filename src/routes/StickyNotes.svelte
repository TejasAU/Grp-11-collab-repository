<script>
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome'
	export let top = 100;
	export let left = 200;
    export let onRemove;
	// console.log(`inside stickyNotes component ${top},${left}`);

    function makeBold() {
    var textarea = document.getElementById("Description");
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selectedText = textarea.value.substring(start, end);
    var newText = textarea.value.substring(0, start) + "<b>" + selectedText + "</b>" + textarea.value.substring(end);
    textarea.value = newText;
    }

</script>

<div class="stickyNotes" style="--y_coordinate:{top}px ; --x_coordinate:{left}px">
    <p style="margin: 0; text-align:end"><button class="stickyButtons" on:click={()=> onRemove({x:left,y:top})}><FontAwesomeIcon icon="times" /></button></p>
	<textarea class="stickyDesc" id="Description" rows="9" cols="19" placeholder="Type Here" />
	<hr style="margin: 0 0 0 0 ;" />
    <button class="stickyButtons" on:click={makeBold}><FontAwesomeIcon icon="bold" /></button>
    <button class="stickyButtons"><FontAwesomeIcon icon="italic" /></button>
    <button class="stickyButtons"><FontAwesomeIcon icon="underline" /></button>
</div>

<style>
	.stickyNotes {
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
	.stickyNotes:hover {
		box-shadow: 10px 10px 20px #ccc;
	}
	.stickyDesc {
		border: none;
		/* overflow: inherit; */
		outline: none;
		resize: none;
        
	}
	.stickyDesc:focus {
		box-shadow: none;
	}
    .stickyButtons{
        border: none;
        background-color: white;
        padding-top: 0;
        padding-bottom: 0;
    }
    .stickyButtons:hover{
        cursor: pointer;
    }
</style>
