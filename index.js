let buttons = ["d", "f"];

document.onkeydown = function(e) {
    if (e.key == buttons[0]) {
        document.getElementById("left-btn").className = "keydown";
        
    }
    if (e.key == buttons[1]) {
        document.getElementById("right-btn").className = "keydown";
    }
}
document.onkeyup = function(e) {
    if (e.key == buttons[0]) {
        document.getElementById("left-btn").className = "keyup";
    }
    if (e.key == buttons[1]) {
        document.getElementById("right-btn").className = "keyup";
    }
}

let settingsList = {
    "left-btn": {
        "title" : "Keybinding",
        "content" : `
        <div style="display: flex; justify-content: center; align-items: center; height: 70%; flex-direction: column;">
            <p>Click to change</p>
            <input type="text" style="width: 70px; height: 70px;" id="key-input" maxlength=1 onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)" autocomplete="off"></input>
        </div>
        `,
        "onclose" : async ()=>{
            
        },
        "onapply" : async ()=>{
            let key = document.getElementById("key-input").value;

            if(key.length > 1 || key.length < 1){
                setTimeout(() => {
                    createWindow("Error", `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;">
                            <p>Please enter a single character</p>
                        </div>
            `);
                }, 300);
                return;
            }

            key = key.toLowerCase();

            let command = " setkey-left " + key;
            await send(command);
            let data = await receive();
            console.log(data)
            if (data == "1"){
                buttons[0] = key;
                document.getElementById("left-btn").innerHTML = `<p style="margin: 0; padding: 0;">${key.toUpperCase()}</p>`;
            }
        }
    },
    "right-btn": {
        "title" : "Keybinding",
        "content" : `
        <div style="display: flex; justify-content: center; align-items: center; height: 70%; flex-direction: column;">
            <p>Click to change</p>
            <input type="text" style="width: 70px; height: 70px;" id="key-input" maxlength=1 onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)" autocomplete="off"></input>
        </div>
        `,
        "onapply" : async ()=>{
            let key = document.getElementById("key-input").value;

            if(key.length > 1 || key.length < 1){
                setTimeout(() => {
                    createWindow("Error", "Please enter a single character", ()=>{}, ()=>{});
                }, 300);
                return;
            }

            key = key.toLowerCase();

            let command = " setkey-right " + key;
            await send(command);
            let data = await receive();
            console.log(data)
            if (data == "1"){
                buttons[1] = key;
                document.getElementById("right-btn").innerHTML = `<p style="margin: 0; padding: 0;">${key.toUpperCase()}</p>`;
            }
        }
    }
}


function setting(key){
    let settings = settingsList[key];
    createWindow(settings.title, settings.content, settings.onclose, settings.onapply);
}


function createWindow(title, init, onclose, onapply){
    randomID = Math.round(Math.random()*1000);
    let applybtn = '<p id="apply-btn" class="btn" style="padding: 10px; width: 70px;">Apply</p>';
    if(!onapply) applybtn = "";
    code = `
    <div class="window" id="bg${randomID}">
        <div id="window">
            <div style="display: flex; height: 50px; max-height: 50px;">
                <h2 style="text-align: center; font-weight: 400; width:450px; background-color: rgb(22, 22, 22); margin: 0; padding-top: 10px;">${title}</h2>
                <p id="close-btn" style="margin: 0; width: 50px; height: 40px; text-align: center; padding-top: 10px; font-size: 24px;">X</p>
            </div>
            <div id="content" style="height: 100%">
                ${init}
                <div style="display: flex; justify-content: center; align-items: center;">
                    ${applybtn}
                </div>
            </div>
        </div>
    </div>`;

    document.body.innerHTML = code + document.body.innerHTML;

    let bg = document.getElementById("bg"+randomID);
    bg.classList.add("fadein");

    if(onapply){
        document.getElementById("apply-btn").onclick = function(){
            bg.classList.remove("fadein");
            bg.classList.add("fadeout");
            if (typeof onapply === "function")
                onapply();
    
            setTimeout(()=>{
                bg.remove();
            }, 200);
        }
    }
    
   
    document.getElementById("close-btn").onclick = function(){
        bg.classList.remove("fadein");
        bg.classList.add("fadeout");
        if (typeof onclose === "function")
            onclose();

        setTimeout(()=>{
            bg.remove();
        }, 200);
    }
}
