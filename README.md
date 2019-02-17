# buscadorGatos

## Requisitos funcionales

Implementar la funcionalidad de categorias de gatos o perros usando la tecnología Ajax. Las búsquedas se deben realizar con el servidor REST API  JSON SERVER o el externo https://my-json-server.typicode.com/DWEC-18-19/TheCatApi

1. Implementar una galeria de gatos o perros que muestre de la categoria seleccionada 50 gatos utilizando el API https://thecatapi.com/.
2. Implementar la paginación de la galería para mostrar los gatos en varias páginas. 

## Requisitos técnicos
1. No puede utilizarse jquery, debe utilizarse Vainilla JavaScript
2. Los Callbacks deben utilizar promesas o Async/await
3. Se valorará positivamente la utilización de  frameworks como Vue, Angular o React


### Descripción
Tras revisar el funcionamiento de esta API, para el máximo por categoria de gatos he puesto el limite de unas 40 imágenes y mostrando un limite de 8 imágenes por pagina. Así, dependiendo del número por categoría, se divide entre 8 para tener el número de páginas, incluyendo los botones, "<<" y ">>" para ir avanzando a la siguiente pagina o retroceder a la anterior pagina.

Sobre las tecnologías que he usado para la carga de los dos JSON, el de las imágenes en la API y el de las categorías en local, he  utilizado AJAX: una función asíncrona que espera con dos await que esperan la carga de ambos JSON. Además, el resto de la página la creo con DOM,.
