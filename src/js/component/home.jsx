import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
	const [tasks, setTask] = useState([]);
	const [newTask, setNewTask] = useState('');

	useEffect(() => {
		const fetchTasks = async () => { 
			try { 
				const response = await fetch('https://playground.4geeks.com/todo/users/kale'); 
				if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`); 
				const data = await response.json(); 
				setTask(Array.isArray(data.todos) ? data.todos : []); 
			} catch (error) { 
				console.error('There was a problem with the fetch operation:', error); 
			} 
		}; 
		fetchTasks();
	}, []);

	const addTask = () =>{
		if (newTask.trim()) { 
			const newTaskData = { label: newTask, is_done: false }; 
	
			fetch('https://playground.4geeks.com/todo/todos/kale', { 
			method: "POST", 
			body: JSON.stringify(newTaskData), 
			headers: { 
				"Content-Type": "application/json" 
			} 
		}) 
		.then(resp => resp.json()) 
		.then(data => { 
			setTask([...tasks, data]);
			setNewTask('');
			console.log("Tareas actualizadas:", data); 		
		}) 
		.catch(error => console.log(error)); 
	}
};

	const deleteTask = (taskId) => {
		console.log(`Deleting task with ID: ${taskId}`);
		const endpoint = `https://playground.4geeks.com/todo/todos/${taskId}`; 
		console.log(`Endpoint formed: ${endpoint}`); 
		
		fetch(endpoint, { 
			method: "DELETE", 
			headers: { 
				"Content-Type": "application/json" 
			} 
		})
		.then(() => {
		const updatedTask= tasks.filter(task => task.id !== taskId);
		setTask(updatedTask);
		console.log("Tarea eliminada");
	})
	.catch(error => console.log(error));
	};

	return (
		<div className="text-center container w-50 justify-content-center">
			<h1>To-do List</h1>
			<div className="principal">
				<div className="agregar">
					<input
						className="titulo"
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Whats need to be done?"
					/>
					<button style={{borderRadius:"20%", borderColor: "white", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}} className="btn-agregar" onClick={addTask}>Add</button>
				</div>
				<ul className="list-group">
					{tasks.length === 0 ? (
						<li className="list-group-item disabled" aria-disabled="true">No hay tareas</li>
					) : (
						Array.isArray(tasks) && tasks.map((task) => (
							<li className="list-group-item list-group-item-light d-flex justify-content-between" key={task.id}>
								{task.label}
								<button style={{ backgroundColor: "transparent", borderColor: "transparent" }} className="btn btn-outline-danger" onClick={() => deleteTask(task.id)}>X</button>
							</li>
						))
					)}
					<li className="list-group-item text-start"><p>{tasks.length} item left</p></li>
					<li className="list-group-item primero"></li>
					<li className="list-group-item segundo"></li>
				</ul>
			</div>

		</div>
	);
};

export default Home;
