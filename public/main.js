var socket = io.connect("https://chatexperimenta7-3.onrender.com",{'forceNew':true}); 

socket.on('messages',(data)=>{//crea un evento que se requiere escuchar llamado 'messages' y el callback con los datos que va recibir 
    console.log(data);
    render(data);
});

const render=(data)=>{
    var html = data.map(function(elem,index){
        if (elem.user % 2 === 0) {
            return( `<br><div></div>
            <div style="display:flex;padding: 1vw;justify-content: flex-end;">
                <div style="background-color: rgb(0, 0, 0);">
                    <p style="color:white;font-size: 2.5vw;background-color: rgb(33, 242, 235);border-radius: 1vw;">
                        &nbsp;${elem.msg}&nbsp;
                    </p>
                </div>  
                <div style="background-color: rgb(0, 0, 0);">
                    <p style="color: rgb(240,240,240);font-weight: 700;font-size: 1.1vw;">
                        &nbsp;&nbsp; ${elem.name}
                    </p>
                </div>
            </div>`);
        } else {
            return( `<br><div></div>
            <div style="display:flex;padding: 1vw;">
                <div style="background-color: rgb(0, 0, 0);">
                    <p style="color: rgb(240,240,240);font-weight: 700;font-size: 1.1vw;">
                        ${elem.name}&nbsp;&nbsp;&nbsp;
                    </p>
                </div>
                <div style="background-color: rgb(0, 0, 0);">
                    <p style="color:white;font-size: 2.5vw;background-color: rgb(33, 127, 242);border-radius: 1vw;">
                        &nbsp;${elem.msg}&nbsp;
                    </p>
                </div>  
            </div>`);
        }
        
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

const addMessage=(e)=>{
    var payload = {
        name: document.getElementById('username').value,
        msg: document.getElementById('texto').value
    }
    socket.emit('new-message',payload);
    return false;
}
