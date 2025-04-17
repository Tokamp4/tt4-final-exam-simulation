<!-- src/lib/components/TaskList.svelte -->
<script lang="ts">
	import type { Task } from '$lib/models/Task';
	export let tasks: Task[];
	export let onToggle: (task: Task) => void;
	export let onDelete: (id: number) => void;
</script>

<ul>
	{#each tasks as task}
		<li>
			<input type="checkbox" bind:checked={task.completed} on:change={() => onToggle(task)} />
			<strong style="text-decoration: {task.completed ? 'line-through' : 'none'}">
				{task.title}
			</strong>
			- {task.description}
			<button on:click={() => onDelete(task.id!)}>🗑️</button>
		</li>
	{/each}
</ul>
