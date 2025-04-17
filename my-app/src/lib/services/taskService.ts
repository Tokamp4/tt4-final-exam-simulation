// src/lib/services/taskService.ts

import type { Task } from '$lib/models/Task';

const API_URL = '/api/tasks';

export async function getTasks(): Promise<Task[]> {
	const res = await fetch(API_URL);
	return await res.json();
}

export async function createTask(task: Task): Promise<Task> {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task)
	});
	return await res.json();
}

export async function updateTask(task: Task): Promise<void> {
	await fetch(`${API_URL}/${task.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task)
	});
}

export async function deleteTask(id: number): Promise<void> {
	await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	});
}