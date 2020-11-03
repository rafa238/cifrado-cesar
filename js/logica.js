//vamos a utilizar javascript ver 6, apartir de funciones
//de tipo callback y funciones anonimas
window.onload = () => {
    var bt1 = document.getElementById("cesar");
    var bt2 = document.getElementById("cesarM");
    var divcesar = document.getElementById("divcesar");
    var divcesarM = document.getElementById("divcesarM");
    divcesarM.style.display = 'none';
    bt1.addEventListener('click', () =>{bt1.className = "btn btnActivo"; bt2.className = "btn btnDesactivo"; divcesarM.style.display = "none";divcesar.style.display = "inline"});
    bt2.addEventListener('click', () =>{bt2.className = "btn btnActivo"; bt1.className = "btn btnDesactivo"; divcesarM.style.display = "inline", divcesar.style.display = "none"});
}


var cesar = cesar || (function(){
    //una funcion que no tiene nombre, porque le da penita
    
    var cifrarM = function(txt, k){
        var palabra = [];
        var pcifrada = [];
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u',  'v', 'w', 'x',
        'y', 'z'];
        for(var i=0; i<txt.length; i++){
            var l = abc.length;
            var c = txt.charAt(i);
            if(c == " "){
                pcifrada[i] = " ";
            }else{
                var p = abc.indexOf(c.toLowerCase());
                var pos = p;
                palabra[i] = (pos + k) % l;
                console.log(palabra[i]);
                pcifrada[i] = abc[palabra[i]];
            }
        }
        return pcifrada.join('');
        //return palabra;
    }

    var descifrarM = function(txt, k){
        var palabra = [];
        var pcifrada = [];
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u',  'v', 'w', 'x',
        'y', 'z'];
        for(var i=0; i<txt.length; i++){
            var l = abc.length;
            var c = txt.charAt(i);
            if(c == " "){
                pcifrada[i] = " ";
            }else{
                var p = abc.indexOf(c.toLowerCase());
                var pos = p;
                palabra[i] = (pos - k) % l;
                if(palabra[i] < 0){
                    palabra[i] = l + palabra[i] ;
                } 
                console.log(palabra[i]);
                pcifrada[i] =  abc[palabra[i]]
            }
        }
        return pcifrada.join('');
        //return palabra;
    }

    //funcion para la operacion del cifrado
    //texto, desp, accion
    var doStaff = function(txt, desp, action){
        //otra variable que se encargue del reemplazo de
        //la cadena origianl para realizar los movimientos
        //del cifrado
        var replace = (function(){
            //definir nuestro alfabeto
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u',  'v', 'w', 'x',
        'y', 'z'];
            //saber la longitud
            var l = abc.length;
            //voya  retornar de mi funcion
            return function(c){
                //aqui adentro vamos a realizar la logica
                //que se encarga del cifrado y descifrado
                var i = abc.indexOf(c.toLowerCase());
                //saber si esta vacio el campo
                //if(i != -1){
                    //no esta vacia
                    var pos = i;
                    //cifrar o descifrar
                    if(action){
                        //cifrando
                        pos += desp;
                        pos = (pos > abc.length)? pos - abc.length : pos;
                        pos -= (pos>=1)?1:0;
                    }else{
                        //descifrando
                        pos -= desp;
                        pos++;
                        //pos += (pos<=0)?1:0;
                        pos = (pos < 0)?abc.length + pos: pos;
                    }
                    return abc[pos];
                //}
                return c;
            };
        })();
        //tenemos que realizar una prueba del texto que estan
        //escribiendo en el textarea para que sea
        //solo lo que yo quiero
        var re = (/([a-z-ñ])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });

        
    }
    //necesiatar saber que estoy mandando
        //cifrado o descifrado, eso viene apartir de
        //el boton que tiene una funcion code y otra deco

        return{
            encode : function(txt, desp){
                return doStaff(txt, desp, true);
            },
            decode : function(txt, desp){
                return doStaff(txt, desp, false);
            },
            encodem: function(txt, desp){
                return cifrarM(txt, desp);
            },
            decodem: function(txt, desp){
                return descifrarM(txt, desp);
            }
        };
})();

//voy a crear mis funciones de cifrado

function codificar(){
    var desp = parseInt(document.getElementById('valorDesp').value);
    var cadena = document.getElementById('cadena').value;
    console.log(typeof(desp));
    if(isNaN(desp)){
        alert("ingresa bien el desplazamiento");
    }else if(desp > 28 || desp<0){
       alert("debe ser un numero entre 1 y 28")
    }else if(cadena === ""){
        alert("Ingresa la cadena que quieres cifrar");
    }else{
        document.getElementById('resultado').innerHTML = cesar.encode(
            cadena, desp
        );
    }
}

function decodificar(){
    var desp =  parseInt(document.getElementById('valorDesp').value);
    var cadena = document.getElementById('cadena').value;
    if(isNaN(desp)){
        alert("ingresa bien el desplazamiento");
    }else if(desp > 28 || desp<0){
       alert("debe ser un numero entre 1 y 28")
    }else if(cadena === ""){
        alert("Ingresa la cadena que quieres cifrar");
    }else{
        document.getElementById('resultado').innerHTML = cesar.decode(
            cadena, desp
        );
    }
}

function codificarMejorado(){
    var k = parseInt(document.getElementById('valorDesp').value);
    var cadena = document.getElementById('cadena').value;
    if(isNaN(k)){
        alert("ingresa el campo de desplazamiento")
    }else if(k > 28 || k<0){
        alert("debe ser un numero entre 1 y 28")
    }else if(cadena === ""){
        alert("Ingresa la cadena que quieres cifrar");
    }else{
        document.getElementById('resultado').innerHTML = cesar.encodem(cadena, k);
    }
    
}

function decodificarMejorado(){
    var k = parseInt(document.getElementById('valorDesp').value);
    var cadena = document.getElementById('cadena').value;
    if(isNaN(k)){
        alert("ingresa el campo de desplazamiento")
    }else if(k > 28 || k<0){
        alert("debe ser un numero entre 1 y 28")
    }else if(cadena === ""){
        alert("Ingresa la cadena que quieres cifrar");
    }else{
        document.getElementById('resultado').innerHTML = cesar.decodem(cadena, k);
    }
}