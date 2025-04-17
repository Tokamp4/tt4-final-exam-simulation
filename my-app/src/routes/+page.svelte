<script lang="ts">
	import { onMount } from 'svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import type { Task } from '$lib/models/Task';
	import { getTasks, createTask, deleteTask, updateTask } from '$lib/services/taskService';

	let tasks: Task[] = [];

	let newTask: Task = {
		title: '',
		description: '',
		completed: false
	};

	async function loadTasks() {
		tasks = await getTasks();
	}

	onMount(loadTasks);

	async function addTask() {
		await createTask(newTask);
		newTask = { title: '', description: '', completed: false };
		await loadTasks();
	}

	async function removeTask(id: number) {
		await deleteTask(id);
		await loadTasks();
	}

	async function toggleTask(task: Task) {
		console.log(task);
		
		await updateTask({ ...task, completed: !task.completed });
		await loadTasks();
	}
</script>

<h1>📋 Task Manager</h1>

<form on:submit|preventDefault={addTask}>
	<input type="text" placeholder="Title" bind:value={newTask.title} required />
	<input type="text" placeholder="Description" bind:value={newTask.description} required />
	<button type="submit">Add Task</button>
</form>

<TaskList {tasks} onToggle={toggleTask} onDelete={removeTask} />