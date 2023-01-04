<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<script>
    let boardName = "Board Name";
    $: editedBoard = boardName;
    let boardFlag = "false";

    function handleBoardName(){
        boardFlag = "true";
    }

    function onKeyPress(e){
        if(e.charCode === 13){
            boardFlag = "false"
        }
    }

    const ZOOM_SPEED = 0.1;
    let zoom = 1;
    
    function handleZoom(e){
        if(e.deltaY >0) {
            zoom+=ZOOM_SPEED;
        }
        else {
            if(zoom>0.5) zoom -= ZOOM_SPEED;
        }

    }
    let flag = true;
    function handleClickZoom(){
        if(flag) zoom += ZOOM_SPEED;
        else if(!flag && zoom>0.5) zoom -= ZOOM_SPEED;
    }
    function handlePlus(){
        flag = true;
        handleClickZoom();
    }
    function handleMinus(){
        flag = false;
        handleClickZoom();
    }
</script>

<main>
    <div class="main" on:mousewheel={handleZoom} style="transform: scale({zoom});">
        <h1> Scroll Me</h1>
    </div>
        <!-- <h1>{zoom}</h1> -->
        <div class="wrapper-1">
            <div class="board-name">
                <div contenteditable={boardFlag} on:keypress={onKeyPress}>{editedBoard}<button on:click={handleBoardName} contenteditable="false">Edit</button></div>
                
            </div>
            <div class="search">
                <div class="search-bar-wrapper">
                    <div class="search-bar">
                        <input type="text" placeholder="  &#xf002; Search" name="search" style="font-family: FontAwesome;">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="wrapper-2">
                <button on:click={handlePlus}>+</button>
                <button on:click={handleMinus}>-</button>
                <div class="size">{Math.round(zoom*100)}%</div>
            </div>
        </div>
</main>

<style>
    :global(body){
        background-color: #f3f3f3;  
    }
    .main{
        height:100vh;  
        width:100%;  
        display:grid;  
        place-items:center;  
        position:fixed;  
        top:0;  
        left:0;
        /* transform: scale(zoom); */
    }
    .wrapper-1{
        padding: 0rem 1rem;
        display: flex;
        justify-content: space-between;
        /* position: absolute; */
        /* z-index: 10; */
    }
    .board-name{
        position: relative;
        margin: 0rem;
        width: fit-content;
        font-weight: bold;
        background-color: #ffffff;
        border: none;
        border-radius: 1rem;
        margin: 2rem 0rem;
    }
    .board-name div{  
        font-size: 1.5rem;
        margin: 0rem 0.5rem;
    }
    .board-name div button{
        /* margin-left: 1.55rem; */
        position: relative;
        margin: 0.5rem 0rem 0.5rem 3rem;
        height:fit-content;
        -webkit-border-radius: 10;
        -moz-border-radius: 10;
        border: solid #0066FF 2px;
        border-radius: 0.5rem;
        font-family: Arial;
        color: #ffffff;
        font-size: 1.5rem;
        background: #0066FF;
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-size: 1rem;
    }
    .board-name div button:hover{
        background: #2879eb;
        text-decoration: none;
    }

    .search{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .search-bar-wrapper{
        width:fit-content;
        height:fit-content;
        background-color: rgb(255, 255, 255);
        border-radius: 0.5rem;
    }
    .search-bar input[type=text]{
        width:300px;
        height:25px;
        border-radius:8px;
        border: none;
        padding: 0.2rem;
    }
    
    .search-bar{
        border: solid rgb(208, 208, 208) 0.1rem;
        border-radius:8px;
        float:right;
        margin:7px;
    }
    .footer{
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }
    .wrapper-2{
        display: flex;
        justify-content: space-around;
    }
    .wrapper-2 button{
        position: relative;
        margin-right: 00.5rem;
        height:fit-content;
        -webkit-border-radius: 10;
        -moz-border-radius: 10;
        border: solid #0066FF 2px;
        border-radius: 0.5rem;
        font-family: Arial;
        color: #ffffff;
        font-size: 1.5rem;
        background: #0066FF;
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-size: 1rem;
    }
    .wrapper-2 button:hover{
        background: #2879eb;
        text-decoration: none;
    }
    .size{
        display: grid;
        place-items: center;
        border-radius: 0.5rem;
        background-color: #ffffff;
        border: solid #eeeeee 1px;
    }
</style>