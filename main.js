const cuentas=[
   {nombre:"carlos", saldo: 200, password:'123',intentos:0},
   { nombre:"merly", saldo: 300, password: '456',intentos:0},
   {nombre: "belen", saldo:400,password:'mabel',intentos:0}
]

  let seccionAcceso=document.getElementById("seccion-acceso");
  let seccionOperaciones=document.getElementById("seccion-operaciones");
  let seccionDeposito=document.getElementById("seccion-deposito");
  let seccionRetiro=document.getElementById("seccion-retiro");
  let seccionsaldo=document.getElementById("saldo");

  seccionOperaciones.hidden=true;
  seccionsaldo.hidden=true;
  seccionDeposito.hidden=true;
  seccionRetiro.hidden=true;


function acceso(cliente,contraseña){

    let flagAlert =true;
    let alert=document.getElementById("LiveAlert");
    

    for(let i=0; i < cuentas.length;i++){
        
        let tmpCliente=cuentas[i];

        if ((cliente.toLowerCase() === tmpCliente.nombre.toLowerCase()) && (contraseña===tmpCliente.password))
            {
                
                alert.classList.add("alert-primary");
                alert.innerText="Acceso Exitoso";
                flagAlert=false;
                seccionAcceso.hidden=true;
                seccionOperaciones.hidden=false;
                setTimeout(function (){cleanmessage()}, 2000);
                break;
            } 
        
            
            if (flagAlert == true){
                if (tmpCliente.intentos < 3){
                    alert.textContent=" Verifique su usuario y su contraseña, por favor";
                    tmpCliente.intentos=tmpCliente.intentos +1;
                }
            else
                alert.textContent=" Usted ha superado el número de intentos, por favor  regrese mañana";
                
            }
            alert.classList.add("alert-danger");
       setTimeout(function (){cleanmessage()}, 3000);
}
}



function cleanmessage(){

    let alert=document.getElementById("LiveAlert");
    alert.classList.remove("alert-danger","alert-primary");
    alert.innerText="";
}
function limpiar(){
    
    document.getElementById("cliente").value="";
    document.getElementById("contraseña").value="";
    document.getElementById("check1").value="";
}

function consultarSaldo(cliente){

    for(let i=0; i < cuentas.length;i++){
        let tmpCliente=cuentas[i];

        if (cliente.toLowerCase() === tmpCliente.nombre.toLowerCase()){

            //document.write("El saldo de tu cuenta es:"+ tmpCliente.saldo);
            let consultasaldo=document.getElementById("saldito");
            consultasaldo.innerText=tmpCliente.saldo;
        } 
}
}

function ingresarMonto(cliente,monto){

    if ( isNaN(monto)){
        monto=0;
    } else{
    for(let i=0; i < cuentas.length;i++){
        let tmpCliente=cuentas[i];

        if (cliente.toLowerCase() === tmpCliente.nombre.toLowerCase()){
            tmpCliente.saldo=tmpCliente.saldo + monto;

            let consultasaldo=document.getElementById("saldito");
            consultasaldo.innerText=tmpCliente.saldo;
        } 
    }
}
}

function RetirarMonto(cliente,monto){

    for(let i=0; i < cuentas.length;i++){
        let tmpCliente=cuentas[i];

        if (cliente.toLowerCase() === tmpCliente.nombre.toLowerCase()){
            tmpCliente.saldo=tmpCliente.saldo - monto;

            let consultasaldo=document.getElementById("saldito");
            consultasaldo.innerText=tmpCliente.saldo;
        } 
}
}
function actualizarSaldo(){
    let usuario=document.getElementById("cliente").value;
    console.log(usuario);
    let monto=parseInt(document.getElementById("deposito").value);
    ingresarMonto(usuario,monto);
}

let btnacceso=document.getElementById("btn-acceso");

btnacceso.addEventListener("click", function()
{
    let usuario=document.getElementById("cliente").value;
    let pass=document.getElementById("contraseña").value;
    acceso(usuario,pass);
});

let btnlimpiar=document.getElementById("btn-limpiar");

btnlimpiar.addEventListener("click", function()
{
    limpiar();
});

let btnconsulta=document.getElementById("btn-consulta");
btnconsulta.addEventListener("click",function()
{
    seccionsaldo.hidden=false;
    let usuario=document.getElementById("cliente").value;
    consultarSaldo(usuario);
})

let btndeposito=document.getElementById("btn-deposito");
btndeposito.addEventListener("click",function()
{
    seccionOperaciones.hidden=true;
    seccionRetiro.hidden=true;
    seccionsaldo.hidden=false;
    seccionDeposito.hidden=false;
    let usuario=document.getElementById("cliente").value;
    console.log(usuario);
    let monto=parseInt(document.getElementById("deposito").value);
    ingresarMonto(usuario,monto);
})

let btnretiro=document.getElementById("btn-retiro");
btnretiro.addEventListener("click",function()
{
    seccionOperaciones.hidden=true;
    seccionRetiro.hidden=false;
    seccionsaldo.hidden=false;
    seccionDeposito.hidden=true;
    let usuario=document.getElementById("cliente").value;
    let monto=parseInt(document.getElementById("retiro").value);
    RetirarMonto(usuario,monto);
})