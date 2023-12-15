const listaDeTareas = document.querySelector("#tareas")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")

const tareas = [
  {
    id: 1,
    tarea: 'Estudiar JavaScript',
    hecha: false
  },
  {
    id: 2,
    tarea: 'Dibujar',
    hecha: true
  },
  {
    id: 3,
    tarea: 'Editar fotos',
    hecha: false
  },
]
renderTareas()

let newID = 4

btnAgregar.addEventListener('click', agregarTarea )
tareaInput.addEventListener('keydown', e => {
  if(e.key === 'Enter'){
    agregarTarea()
  }
})

function agregarTarea(){
  let tareaNueva = tareaInput.value
  if(tareaNueva.trim() != ''){
    //agregar tarea desde el input al array
    tareas.push({
      id: newID,
      tarea: tareaNueva,
      hecha: false
    })

    //Vacia el input, renderiza la tarea y aumenta el ID
    tareaInput.value = ''
    renderTareas()
    newID++
  } else {
    alert('Ingresa una tarea')
  }
}

function renderTareas(){
  let html = ''
  tareas.forEach(t => {
    html += `
    <tr>
      <td>${t.id}</td>
      <td>
        <label 
          for="${t.id}"
          class="${t.hecha ? "hecha" : ""}">
          ${t.tarea}
        </label>
      </td>
      <td><input 
        type="checkbox" 
        onchange="marcarTarea(${t.id})" 
        id="${t.id}"
        ${t.hecha ? "checked" : ""}>
      </td>
      <td>
        <button onclick="eliminarTarea(${t.id})">
          <i class='bx bx-trash'></i>
        </button>
      </td>
    </tr>`
  })
  listaDeTareas.innerHTML = html
  contarTareas()
}

function eliminarTarea(idTarea){
  const indexEliminar = tareas.findIndex(t => t.id === idTarea)
  tareas.splice(indexEliminar, 1)
  renderTareas()
}

function marcarTarea(idTarea){
  const index = tareas.findIndex(t => t.id === idTarea)
  const checkbox = document.getElementById(tareas[index].id)
  tareas[index].hecha = checkbox.checked
  renderTareas()
}

function contarTareas(){
  const totalTareas = document.querySelector('#cuenta-tareas')
  const totalHechas = document.querySelector('#cuenta-tareas-hechas')
  
  const tareasHechas = tareas.filter(t => t.hecha)

  totalTareas.textContent = tareas.length
  totalHechas.textContent = tareasHechas.length
}

