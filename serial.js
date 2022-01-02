let reader;
let writer;
let encoder = new TextEncoder();
let decoder = new TextDecoder();

async function getDevice(){
    try{
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        if (!reader && !writer) {
            reader = port.readable.getReader();
            writer = port.writable.getWriter();
        }
        await send(" connect");
        data = await receive();
        
        if(data.endsWith("1")){
            data += await receive();
        }
        if (data.startsWith("1")){
            if (typeof onConnect === "function") { 
                onConnect(data);
            }
        }else{
            createWindow("Error", `
                <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;">
                    <p style="margin: 0;">Incorrect hardware</p>
                    <p style="margin: 0;">Make sure you have connect to correct serial ports.</p>
                    <p style="margin: 0;">Or you can upgrade firmware by going to <a style="color: #b5d1ff" target="_blank" href="https://github.com/kidjanate/OsuPad">https://github.com/kidjanate/OsuPad</a></p>
                </div>
            `);
        }
    }catch (e){
        createWindow("Error", `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <p>${e.message}</p>
        </div>
        `);
    }
    
}

async function send(data){
    let dataBuffer = encoder.encode(data);
    writer.write(dataBuffer);
}

async function receive(){
    data = await reader.read()
    return decoder.decode(data.value);
    
}

async function RunCommand(command){
    await send(" "+command);
}