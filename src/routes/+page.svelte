<script>
	import Icon from '@iconify/svelte';
	import StickyNotes from './StickyNotes.svelte';
	import { library, dom } from '@fortawesome/fontawesome-svg-core';
	import { faBold, faItalic, faUnderline, faTimes } from '@fortawesome/free-solid-svg-icons';
	library.add(faBold);
	library.add(faItalic);
	library.add(faUnderline);
	library.add(faTimes);

	import { db } from '../db';
	import { onMount,afterUpdate } from 'svelte';
	import {v4 as uuid} from 'uuid';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte/internal';
	// import {nameStore} from '../boardName'
	let boardName = '';
	$: editedBoard = boardName;
	let boardFlag = 'false';
	let buttonstate = 'Edit';
	function handleBoardName() {
		boardFlag = !boardFlag;
		if(boardFlag)
			buttonstate = 'Save'
		else buttonstate = 'Edit'
	}

	function onKeyPress(e) {
		if (boardFlag && e.charCode === 13) {
			boardFlag = 'false';
			let title = document.querySelector('#boardname').innerHTML;
			localStorage.setItem("name",title.slice(0,title.length-68));
			buttonstate = 'Edit';
		}
	}

	const ZOOM_SPEED = 0.1;
	let zoom = 1;
	let x_coordinate;
	let y_coordinate;
	function handleZoom(e) {
		x_coordinate = e.clientX;
		y_coordinate = e.clientY;
		console.log(x_coordinate, y_coordinate);
		if (e.deltaY > 0) {
			zoom += ZOOM_SPEED;
		} else {
			if (zoom > 0.5) zoom -= ZOOM_SPEED;
		}
	}
	let flag = true;
	function handleClickZoom() {
		if (flag) zoom += ZOOM_SPEED;
		else if (!flag && zoom > 0.5) zoom -= ZOOM_SPEED;
	}
	function handlePlus() {
		flag = true;
		handleClickZoom();
	}
	function handleMinus() {
		flag = false;
		handleClickZoom();
	}
	let grabOn = false;
	let isDragging = false;
	let currentX;
	let currentY;
	let initialX;
	let initialY;
	let xOffset = 0;
	let yOffset = 0;
	function dragStart(event) {
		if (grabOn) {
			isDragging = true;
			initialX = event.clientX - xOffset;
			initialY = event.clientY - yOffset;
			console.log(initialX, initialY);
		}
	}
	function dragEnd(event) {
		isDragging = false;
	}
	function drag(event) {
		if (grabOn && isDragging) {
			currentX = event.clientX - initialX;
			currentY = event.clientY - initialY;

			xOffset = currentX;
			yOffset = currentY;
		}
	}
	let penColor = '';
	function handleGrab() {
		grabOn = !grabOn;
		console.log(grabOn);
		if (grabOn) penColor = '#0066ff';
		else penColor = '';
	}

	let stickynotecontainer = [];
	// console.log(stickynotecontainer)
	async function removeNote(id) {
		// console.log(id)
		try {
			await db.notes
				.where('id').equals(id).delete()
				.then(() => console.log('Deleted Successfully'))
				.catch((err) => console.log(err));
			stickynotecontainer = await db.notes.toArray();
		} catch (err) {
			console.log(err);
		}
	}
	async function addNotes(event) {
		let container = document.querySelector('#sticky-notes-container');
		let rect = container.getBoundingClientRect();
		let notesCoordinateX = (event.clientX - rect.left) / zoom;
		let notesCoordinateY = (event.clientY - rect.top) / zoom;
		let uniqueId = uuid();
		// tempIndex++;
		console.log(uniqueId)
		try {
			const note = await db.notes.add({
				id:uniqueId,
				x_coordinate: notesCoordinateX,
				y_coordinate: notesCoordinateY,
				content:''
			});
			stickynotecontainer = await db.notes.toArray();
		} catch (err) {
			console.log(err);
		}
	}

	onMount(async () => {
		editedBoard = localStorage.getItem('name')||'Hello';
		stickynotecontainer = await db.notes.toArray();
		console.log(stickynotecontainer)
	});
	// afterUpdate(()=> console.log(stickynotecontainer))
</script>

<head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</head>

<main>
	<div
		class="main"
		on:mousewheel={handleZoom}
		on:mousedown={dragStart}
		on:mouseup={dragEnd}
		on:mousemove={drag}
		on:dblclick={addNotes}
		style="cursor:{grabOn ? 'grab' : ''};"
		
	>
		<div
			id="sticky-notes-container"
			class="zoom"
			style=" transform-origin:{y_coordinate}px {x_coordinate}px; transform: scale({zoom}); top: {currentY}px; left:{currentX}px;  pointer-events:{grabOn? 'none': ''}"
			
		>
			{#if stickynotecontainer.length<1}
				<!-- this bellow div has to be modified later on -->
				<div style="color: darkgrey; top:300px; left:700px; position:absolute;">
					<h1>Double click to add notes</h1>
					<br /> (Its just temporary for testing)
				</div>
			{:else}
				{#each stickynotecontainer as notes}
					<StickyNotes id={notes.id} top={notes.y_coordinate} left={notes.x_coordinate} onRemove={removeNote} content={notes.content} />
				{/each}
			{/if}
		</div>
	</div>
	<!-- <h1>{zoom}</h1> -->
	<div class="wrapper-1">
		<div>
			<div class="board-name">
				<div
					id="boardname"
					contenteditable={boardFlag}
					placeholder="Enter your Board Name"
					on:keypress={onKeyPress}
					on:click={onKeyPress}
				>
				{editedBoard}<button on:click={handleBoardName} contenteditable="false">{buttonstate}</button>
			</div>
			</div>
			<div class="edit">
				<button on:click={handleGrab} style="--isActive:{penColor}"
					><Icon icon="material-symbols:back-hand" /></button
				>
			</div>
		</div>
		<div class="search">
			<div class="search-bar-wrapper">
				<div class="search-bar">
					<input
						type="text"
						placeholder="  &#xf002; Search"
						name="search"
						style="font-family: FontAwesome;"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="wrapper-2">
			<button on:click={handlePlus}>+</button>
			<button on:click={handleMinus}>-</button>
			<div class="size">{Math.round(zoom * 100)}%</div>
		</div>
	</div>
</main>

<style>
	:global(body) {
		background-color: #f3f3f3;
	}
	.main {
		height: 100vh;
		width: 100vw;
		display: grid;
		place-items: center;
		position: fixed;
		top: 0;
		left: 0;
		/* transform: scale(zoom); */
		overflow: hidden;
	}
	.zoom {
		position: absolute;
		top: 0;
		left: 0;
		/* height: 100%;
		width: 100%; */
	}
	.wrapper-1 {
		padding: 0rem 1rem;
		display: flex;
		justify-content: space-between;
		/* position: absolute; */
		/* z-index: 10; */
	}
	.board-name {
		position: relative;
		margin: 0rem;
		width: fit-content;
		font-weight: bold;
		background-color: #ffffff;
		border: none;
		border-radius: 1rem;
		margin: 2rem 0rem;
	}
	.board-name div {
		font-size: 1.5rem;
		margin: 0rem 0.5rem;
	}

	/* [contentEditable="true"]:empty:before {
    content: attr(placeholder);
    opacity: 0.6;
    } */
	.board-name div button {
		/* margin-left: 1.55rem; */
		position: relative;
		margin: 0.5rem 0rem 0.5rem 3rem;
		height: fit-content;
		-webkit-border-radius: 10;
		-moz-border-radius: 10;
		border: solid #0066ff 2px;
		border-radius: 0.5rem;
		font-family: Arial;
		color: #ffffff;
		font-size: 1.5rem;
		background: #0066ff;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 1rem;
	}
	.board-name div button:hover {
		background: #2879eb;
		text-decoration: none;
	}
	.edit {
		position: absolute;
	}
	.edit button {
		position: relative;
		margin: 4rem 0rem 0.5rem 0rem;
		height: fit-content;
		-webkit-border-radius: 10;
		-moz-border-radius: 10;
		border: solid #0066ff 2px;
		border-radius: 0.5rem;
		font-family: Arial;
		/* color: #ffffff; */
		font-size: 1.5rem;
		background: var(--isActive);
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 1rem;
	}
	/* .edit button:active{
        background: #0066ff;
    } */
	.search {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.search-bar-wrapper {
		width: fit-content;
		height: fit-content;
		background-color: rgb(255, 255, 255);
		border-radius: 0.5rem;
	}
	.search-bar input[type='text'] {
		width: 300px;
		height: 25px;
		border-radius: 8px;
		border: none;
		padding: 0.2rem;
	}

	.search-bar {
		border: solid rgb(208, 208, 208) 0.1rem;
		border-radius: 8px;
		float: right;
		margin: 7px;
	}
	.footer {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
	}
	.wrapper-2 {
		display: flex;
		justify-content: space-around;
	}
	.wrapper-2 button {
		position: relative;
		margin-right: 00.5rem;
		height: fit-content;
		-webkit-border-radius: 10;
		-moz-border-radius: 10;
		border: solid #0066ff 2px;
		border-radius: 0.5rem;
		font-family: Arial;
		color: #ffffff;
		font-size: 1.5rem;
		background: #0066ff;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 1rem;
	}
	.wrapper-2 button:hover {
		background: #2879eb;
		text-decoration: none;
	}
	.size {
		display: grid;
		place-items: center;
		border-radius: 0.5rem;
		background-color: #ffffff;
		border: solid #eeeeee 1px;
	}
</style>
