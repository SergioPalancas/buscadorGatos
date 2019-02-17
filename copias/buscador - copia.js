window.onload=function(){
	controlador();
}

var urlBuscadorCategorias= "http://localhost:3000/categorias";
var urlGatos= "https://api.thecatapi.com/v1/images/search?limit=8";//poner que son 40 que es el maximo.

async function controlador(){

categoriasBuscador= await loadDoc(urlBuscadorCategorias);
console.log(categoriasBuscador)

categoriasGatos= await loadDoc(urlGatos);
console.log(categoriasGatos)

imprimir();

}

//--------Para el paginador-------//
var paginaActual = 1;

//Obtenemos los elementos de la lista
var paginacion = document.getElementById("elementosPaginacion").getElementsByTagName("li");
//--------Para cuando haces click en uno de los paginadores-------//
for (let i = 1; i < paginacion.length-1; i++) {
    	paginacion[i].addEventListener("click", function() {
        paginaActual = i;
        //Valor de las categorias
        var valorInputBuscador = document.getElementById("valores").value;
        var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + i + "&category_ids=" + valorInputBuscador;
        var newGatos = document.getElementById("gatos");
        var newBuscador = document.getElementById("buscador");
        newGatos.innerHTML="";
		//newBuscador.innerHTML="Seleccion una categoria " + " ";
     /*   paginador(url)
        imprimir(url);*/
        buscador(url)
    })
};

document.getElementById("anterior").addEventListener("click",function(){
    if(paginaActual>1){
        var valorInputBuscador = document.getElementById("valores").value;
        paginaActual--;
        var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + valorInputBuscador;
        var newGatos = document.getElementById("gatos");
        var newBuscador = document.getElementById("buscador");
        newGatos.innerHTML="";
		//newBuscador.innerHTML="Seleccion una categoria " + " ";
      /*  paginador(url);
        imprimir(url);*/
    }
})

document.getElementById("siguiente").addEventListener("click",function(){
    if(paginaActual<7){
        var valorInputBuscador = document.getElementById("valores").value;
        paginaActual++;
        var url = "https://api.thecatapi.com/v1/images/search?limit=8&mime_types=jpg,png&order=desc&page=" + paginaActual + "&category_ids=" + valorInputBuscador;
        var newGatos = document.getElementById("gatos");
        var newBuscador = document.getElementById("buscador");
        newGatos.innerHTML="";
		//newBuscador.innerHTML="Seleccion una categoria " + " ";
        /*paginador(url);
        imprimir(url);*/
    }
})

function loadDoc(url) {
	return new Promise(function(resolve,reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);

		/*if(url == urlGatos){
			xhttp.setRequestHeader("x-api-key", "5edeae13-c8cc-480f-9f55-d1570915f357");
		}*/
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

function paginador(url) {
	return new Promise(function(resolve,reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);

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

function imprimir(){
	//--------BUSCADOR-------//
	//obtenemos el id del buscador.
	var newBuscador = document.getElementById("buscador");
	//creamos el selector para el buscador.
	var newSelect = document.createElement("select");
	newSelect.setAttribute("id", "valores")
	newBuscador.appendChild(newSelect);

	for(var i=0; i<categoriasBuscador.length; i++){
		//creamos los valores del select 
		var newOptionValue= document.createElement("option");
		newOptionValue.setAttribute("value",categoriasBuscador[i].id);
		newOptionValue.innerHTML=categoriasBuscador[i].name;
		newSelect.appendChild(newOptionValue);
		
	}
	//Creamos el input de buscar
	var newInputBuscador = document.createElement("input");
	newInputBuscador.setAttribute("value","search");
	newInputBuscador.setAttribute("name","search");
	newInputBuscador.setAttribute("type","button");
	newBuscador.appendChild(newInputBuscador);

	//--------Imagenes gatos-------//
	//obtenener id gatos
	var newGatos = document.getElementById("gatos");

	var newTable = document.createElement("table");
	newGatos.appendChild(newTable);

	for (var i = 0; i <categoriasGatos.length ; i++) {
		var newTr = document.createElement("tr");
		newTable.appendChild(newTr);

	//El contador se reinicia
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

	//--------Cambiar imagenes  con el buscador-------//
	newInputBuscador.addEventListener("click", function(){
		//Obtenemos el valor del buscador.
		var valorInputBuscador = document.getElementById("valores").value;
		console.log(valorInputBuscador);
		var url = urlGatos + "&category_ids=" + valorInputBuscador;
		newGatos.innerHTML="";
		newBuscador.innerHTML="Seleccion una categoria " + " ";
		buscador(url)

	});

}

async function buscador(url){
		categoriasGatos = await loadDoc(url);
		imprimir(categoriasGatos);
}

async function buscador2(url){
		categoriasGatos = await loadDoc(url);
		imprimir(categoriasGatos);
}







