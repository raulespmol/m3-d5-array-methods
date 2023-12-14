const listaDeTareas = document.querySelector("#tareas")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")

const tareas = []

btnAgregar.addEventListener('click', () => {
  //agregar tarea desde el input al array
  let tareaNueva = tareaInput.value
  tareas.push({
    id: Date.now(),
    tarea: tareaNueva,
    hecha: false
  })

  tareaInput.value = ''
  renderTareas()

})



function renderTareas(){
  let html = ''
  tareas.forEach(t => {
    html += `
    <li>
      <span>${t.tarea}</span>
      <button onclick="eliminarTarea(${t.id})">Eliminar</button>
      <input type="checkbox" onchange="checkDone(${t.id})" id="${t.id}">
    </li>`
  })
  listaDeTareas.innerHTML = html
  contarTareas()
}



function eliminarTarea(idTarea){
  const indexEliminar = tareas.findIndex(t => t.id === idTarea)
  tareas.splice(indexEliminar, 1)
  renderTareas()
}

function checkDone(idTarea){
  const index = tareas.findIndex(t => t.id === idTarea)
  const checkbox = document.getElementById(tareas[index].id)
  tareas[index].hecha = checkbox.checked
  contarTareas()
}

function contarTareas(){
  const totalTareas = document.querySelector('#cuenta-tareas')
  const totalHechas = document.querySelector('#cuenta-tareas-hechas')
  
  const tareasHechas = tareas.filter(t => t.hecha)

  totalTareas.textContent = `${tareas.length} Tareas ingresadas`
  totalHechas.textContent = `${tareasHechas.length} Tareas hechas`
}