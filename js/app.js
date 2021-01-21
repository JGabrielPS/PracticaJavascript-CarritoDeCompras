const carrito = document.querySelector('#carrito');
      contenedorCarrito = document.querySelector('#lista-carrito tbody');
      vaciarCarrito = document.querySelector('#vaciar-carrito');
      listarCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//funciones
const limpiarHTML = () => {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

const sincronizarStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
};

const carritoHTML = () => {
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <img src=${imagen} width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href=# class="borrar-curso" data-id=${id}>X</a>
            </td>
        `;
        
        contenedorCarrito.appendChild(row);
    })
      
    sincronizarStorage();
}

const leerDatosCurso = (curso) => {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log(existe);

    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                //objeto actualizado
                return curso;
            }else{
                //objeto sin repetidos
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
      
    carritoHTML(infoCurso);
}

const agregarCurso = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const eliminarCursosCarrito = (e) => {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();
    }
}

//funcion que agrupa los event listener
const registrarEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
      articulosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
      carritoHTML();
    });
    
    listarCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCursosCarrito);

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

//llamada a la funcion de los listeners
registrarEventListeners();
