window.onload=function(){
	controlador();
};

//var urlBuscadorCategorias= "http://localhost:3000/categorias";
var urlBuscadorCategorias= "https://my-json-server.typicode.com/SergioPalancas/buscadorGatos/categorias";
var urlGatos= "https://api.thecatapi.com/v1/images/search?limit=8";
var ulrLimit="https://api.thecatapi.com/v1/images/search?limit=40";


var categoriasBuscador,categoriasGatos,categoriasPaginador;

async function controlador(){

//Para el Buscador
categoriasBuscador= await loadDoc(urlBuscadorCategorias);

//Para mostrar imagenes de gatos
categoriasGatos= await loadDoc(urlGatos);

//Para el paginador
categoriasPaginador= await loadDocPaginator(ulrLimit);

//Llamos a la funcion para crear el buscador de categorias
crearBuscador();

imprimir(categoriasGatos,categoriasPaginador);

}

async function buscadorCategorias(url,urlPaginador){
		categoriasGatos = await loadDoc(url);
		
		categoriasPaginador = await loadDocPaginator(urlPaginador);
		
		imprimir(categoriasGatos,categoriasPaginador);
}

async function cambiarContenidoGatosPaginador(url){
		categoriasGatos = await loadDocPaginator(url);
		imprimirGatos();
}


//--------Para el paginador-------//
var paginador = 0;

function loadDoc(url) {
	return new Promise(function(resolve,reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);

		if(url == urlGatos){//solo entra aqui la primera vez que recargas la pagina, para mostrar imagenes de gatos.
			xhttp.setRequestHeader("x-api-key", "5edeae13-c8cc-480f-9f55-d1570915f357");
		}
  		xhttp.responseType = 'json';

  		xhttp.onload = function(){
  			var status = xhttp.status;
  			var readyState = xhttp.readyState;
  			if (status == 200 && readyState == 4) {
  				resolve(xhttp.response);
  			}else{
  				reject(status);
  			}
		};
		xhttp.send();
	});	
}

function loadDocPaginator(url) {
	return new Promise(function(resolve,reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		
		xhttp.setRequestHeader("x-api-key", "5edeae13-c8cc-480f-9f55-d1570915f357");

  		xhttp.responseType = 'json';

  		xhttp.onload = function(){
  			var status = xhttp.status;
  			var readyState = xhttp.readyState;
  			if (status == 200 && readyState == 4) {
  				resolve(xhttp.response);
  			}else{
  				reject(status);
  			}
		};
		xhttp.send();
	});	
}

function imprimir(categoriaGatos,categoriasPaginado){
	//Llamamos a imprimir gatos
	imprimirGatos();
	//Obtener el id del paginador y lo borramos a lo primero para que quede limpio.
	var divPaginador = document.getElementById("paginador");
	divPaginador.innerHTML="";

	//--------Cambiar imagenes  con el buscador-------//
	var newInputBuscador = document.getElementById("search");
	newInputBuscador.addEventListener("click", function(){
		paginador=0;
		//Obtenemos el valor del buscador.
		var valorInputBuscador = document.getElementById("valores").value;
		//Caso cuando no hay nada de imagenes
		if(valorInputBuscador == 0 || valorInputBuscador==15 || valorInputBuscador==14){
			divPaginador.innerHTML="";
			var newGatos = document.getElementById("gatos");
	        newGatos.innerHTML="";
			document.getElementById("mensajeError").textContent="Selecciona una categoria con imagenes"; 
		}else{
			document.getElementById("mensajeError").textContent="";
			var url = urlGatos + "&category_ids=" + valorInputBuscador + "&page=" + paginador + "&order=DESC" ;
			var urlPaginador = ulrLimit +  "&category_ids=" + valorInputBuscador;
			divPaginador.innerHTML="";
			buscadorCategorias(url,urlPaginador)	;
		}
	});

	//--------------Crear Paginador-------------//
	divPaginador.setAttribute("id", "paginador");
	divPaginador.setAttribute("class", "pagination");
	
	//Creamos la lista
	var newUl = document.createElement("ul");
	newUl.setAttribute("id", "elementosPaginacion");
	divPaginador.appendChild(newUl);

	var newLi = document.createElement("li");
	newUl.appendChild(newLi);

	var enlace = document.createElement("a");
	enlace.setAttribute("href", "#");
	enlace.setAttribute("id","anterior");
	enlace.textContent="<<";
	newLi.appendChild(enlace);
	
	//obtienes el total del array-1/8 para poder saber cuantas paginas mostrar
	var numeroTotalPaginas = parseInt((categoriasPaginador.length-1)/8);

	for (var i = 0; i <=numeroTotalPaginas; i++) {
		enlace=document.createElement("a");
		enlace.textContent=i;
		enlace.setAttribute("href","#");
		newLi.appendChild(enlace);
		if(i==paginador){
			enlace.setAttribute("class", "active");
		}
	}

	var enlace2 = document.createElement("a");
	enlace2.setAttribute("href","#");
	enlace2.setAttribute("id","next");
	enlace2.textContent=">>";
	newLi.appendChild(enlace2);

	var paginacion = document.getElementById("elementosPaginacion").getElementsByTagName("a");
	
	for (let i = 1; i < paginacion.length-1; i++) { //para que no coja el ultimo elemento
    	paginacion[i].addEventListener("click", function() {
    	
        paginador = i-1;//se le resta uno porque el contado empieza desde la posicion 0.
        
        //Cambiamos el atributo de la clase para poder saber en que pagina estamos.
     	var cambiarNombreClase = document.getElementsByClassName("active")[0];
		cambiarNombreClase.className = "";
        paginacion[i].setAttribute("class","active");
		
        //Valor de las categorias
        var valorInputBuscador = document.getElementById("valores").value;
        var newGatos = document.getElementById("gatos");
        if(valorInputBuscador == 0){
			divPaginador.innerHTML="";
	        newGatos.innerHTML="";
			document.getElementById("mensajeError").textContent="Selecciona una categoria para poder usar el paginador"; 
		}else{
			var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + (i-1) + "&category_ids=" + valorInputBuscador;
	        newGatos.innerHTML="";
	        cambiarContenidoGatosPaginador(url);
		}
       
    	});
    }

    var anterior=document.getElementById("anterior");
    anterior.addEventListener("click", function() {
		if(paginador>=1){
			paginador --;
			var cambiarNombreClase = document.getElementsByClassName("active")[0];
			cambiarNombreClase.className = "";
        	modificarPaginaActual();
			
	        //Valor de las categorias
	        var valorInputBuscador = document.getElementById("valores").value;
	       
	        var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginador + "&category_ids=" + valorInputBuscador;
	       
	        var newGatos = document.getElementById("gatos");
	        newGatos.innerHTML="";
	        cambiarContenidoGatosPaginador(url);
		}
	});    	

    var siguiente=document.getElementById("next");
    siguiente.addEventListener("click", function() {
		if(paginador<numeroTotalPaginas){
			paginador ++;

			var cambiarNombreClase = document.getElementsByClassName("active")[0];
			cambiarNombreClase.className = "";
        	modificarPaginaActual();
			
	        //Valor de las categorias
	        var valorInputBuscador = document.getElementById("valores").value;
	       
	        var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginador + "&category_ids=" + valorInputBuscador;
	       
	        var newGatos = document.getElementById("gatos");
	        newGatos.innerHTML="";
	        cambiarContenidoGatosPaginador(url);
		}
	});  
}

//Buscador para las categorias
function crearBuscador(){
	//--------BUSCADOR-------//
	//obtenemos el id del buscador.
	var newBuscador = document.getElementById("buscador");
	//creamos el selector para el buscador.
	var newSelect = document.createElement("select");
	newSelect.setAttribute("id", "valores");
	newBuscador.appendChild(newSelect);

	for(var i=0; i<categoriasBuscador.length; i++){
		//creamos los valores del select 
		var newOptionValue= document.createElement("option");
		newOptionValue.setAttribute("value","seleccione");
		newOptionValue.setAttribute("value",categoriasBuscador[i].id);
		newOptionValue.innerHTML=categoriasBuscador[i].name;
		newSelect.appendChild(newOptionValue);		
	}

	//Creamos el input de buscar
	var newInputBuscador = document.createElement("input");
	newInputBuscador.setAttribute("value","search");
	newInputBuscador.setAttribute("name","search");
	newInputBuscador.setAttribute("id","search");
	newInputBuscador.setAttribute("type","button");
	newBuscador.appendChild(newInputBuscador);
}


function imprimirGatos () {
	//--------Imagenes gatos-------//
	//obtenener id gatos
	var newGatos = document.getElementById("gatos");
	newGatos.innerHTML="";

	var newTable = document.createElement("table");
	newGatos.appendChild(newTable);

	for (var i = 0; i <categoriasGatos.length ; i++) {
		var newTr = document.createElement("tr");
		newTable.appendChild(newTr);

		for (var j = 0; j <4 ; j++) {
			var newTd = document.createElement("td");
			newTr.appendChild(newTd);
			var newImg = document.createElement("img");
			newImg.setAttribute("src", categoriasGatos[i].url);
			newTd.appendChild(newImg);
			if(j != 3){
				i++;
			}
		}
	}	
}

function modificarPaginaActual(){
    var paginacion = document.getElementById("elementosPaginacion").getElementsByTagName("a");
    paginacion[paginador+1].className="active";
}
