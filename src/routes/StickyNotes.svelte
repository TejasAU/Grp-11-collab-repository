<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { onMount, afterUpdate } from 'svelte';
	import { db } from '../db';
	export let id;
	export let top = 100;
	export let left = 200;
	export let onRemove;
	export let color;
	// console.log(`inside stickyNotes component ${top},${left}`);

	export let content;
	onMount(async () => {
		// console.log({'onMount':id});
		await db.notes
			.where('id')
			.equals(id)
			.first()
			.then((data) => {
				content = data.content;
				// console.log(`id: ${data.id} content:${data.content}`);
			});
	});

	afterUpdate(async () => {
		await db.notes.update(id, { content: content,x_coordinate:left, y_coordinate:top });
	});
	// console.log(arr);

	function makeBold() {
		var textarea = document.getElementById('Description');
		var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		var selectedText = textarea.value.substring(start, end);
		var newText =
			textarea.value.substring(0, start) +
			'<b>' +
			selectedText +
			'</b>' +
			textarea.value.substring(end);
		textarea.value = newText;
	}

	// let x = left;
	// let y = top;
	let isMouseDown = false;
	let xOffset = 0;
	let yOffset = 0;
	function handleMouseMove(event) {
		if (isMouseDown) {
			left = event.clientX+xOffset;
			top = event.clientY+yOffset;
		}
	}

	function handleMouseDown(event) {
		isMouseDown = true;
		xOffset = left - event.clientX;
		yOffset = top - event.clientY;
	}

	function handleMouseUp() {
		isMouseDown = false;
	}
</script>

<div class="stickyNotes" style="--y_coordinate:{top}px ; --x_coordinate:{left}px; user-select:{isMouseDown? 'none':''}; z-index:{isMouseDown? '100':''}; background-color:{color}" >
	<p class ="ribbon" style="margin: 0; text-align:end" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mousemove={handleMouseMove}>
		<button class="stickyButtons" on:click={() => onRemove(id)} style=" background-color:{color}"
			><FontAwesomeIcon icon="times" /></button
		>
	</p>
	<textarea
		class="stickyDesc"
		id="Description"
		rows="9"
		cols="19"
		placeholder="Type Here"
		bind:value={content}
		style=" background-color:{color}"
	/>
	<hr style="margin: 0 0 0 0 ;" />
	<button class="stickyButtons" on:click={makeBold} style=" background-color:{color}"><FontAwesomeIcon icon="bold" /></button>
	<button class="stickyButtons" style=" background-color:{color}"><FontAwesomeIcon icon="italic" /></button>
	<button class="stickyButtons" style=" background-color:{color}"><FontAwesomeIcon icon="underline" /></button>
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
		z-index: 99;
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
	.stickyButtons {
		border: none;
		background-color: white;
		padding-top: 0;
		padding-bottom: 0;
	}
	.stickyButtons:hover {
		cursor: pointer;
	}
	.ribbon:hover{
		cursor:move;
	}
</style>
