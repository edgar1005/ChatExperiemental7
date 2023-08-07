const fs = require('fs');
const chat = './db/chat1.json';
const db = require('../database/models/index');

const guardaMensajes = (messages)=>{
    fs.writeFileSync(chat,JSON.stringify(messages));
}
const leeMensajes = () => {
    if(!fs.existsSync(chat)){messages=[];return messages}
    const info = fs.readFileSync(chat,{encoding:'utf-8'});
    const dat = JSON.parse(info);
    return(dat);                           
}

const leeChat=async()=>{
    return new Promise(async(resolve, reject) => {
       try {
        const msg = await db.chat1.findAll({attributes:['msg','name','user'],paranoid:true,raw:true,nest:true});
        resolve(msg)
       } catch (error) {
        reject(error)
       } 
    });
}

const guardaChat=async(msg,name)=>{
    return new Promise(async(resolve, reject) => {
        const t = await db.sequelize.transaction();
        try {
            let array =[];
            let usuario = await db.chat1.findOne({where:{name},attributes:['user'],paranoid:true,raw:true,nest:true});
            if(!usuario){
                usuario = await db.chat1.findAll({attributes:['user'],paranoid:true,raw:true,nest:true});
                usuario.map((key,i)=>{
                    array[i] = key.user;
                });
                const arreglo = array.sort();
                usuario.user = arreglo[arreglo.length-1]+1;
                console.log(usuario.user);
            }
            await db.chat1.create({msg,name,user:usuario.user},{transaction:t});
            await t.commit();
            resolve("Mensajes guardados correctamente")
        }catch (error) {
            await t.rollback();
            reject(error)
        } 
    });
}

module.exports = {
    guardaMensajes,
    leeMensajes,
    leeChat,
    guardaChat
}