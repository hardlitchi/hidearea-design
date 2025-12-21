import type { PageLoad } from './$types';

export interface User {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'user' | 'guest';
	status: 'active' | 'inactive';
}

// Simulate API call
async function fetchUsers(): Promise<User[]> {
	// In a real app, this would be an API call
	await new Promise((resolve) => setTimeout(resolve, 100));

	return [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active' },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'active' },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'inactive' },
		{ id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'admin', status: 'active' },
		{ id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'guest', status: 'active' }
	];
}

export const load: PageLoad = async () => {
	const users = await fetchUsers();
	return {
		users,
		timestamp: new Date().toISOString()
	};
};
