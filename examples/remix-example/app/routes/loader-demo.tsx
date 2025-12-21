import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { Button, Card, Badge } from '@hidearea-design/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Loader Demo - Remix Example' }];
};

interface User {
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
    { id: 5, name: 'Eve Adams', email: 'eve@example.com', role: 'guest', status: 'active' },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await fetchUsers();
  return json({ users, timestamp: new Date().toISOString() });
}

export default function LoaderDemo() {
  const { users, timestamp } = useLoaderData<typeof loader>();

  const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'user':
        return 'primary';
      case 'guest':
        return 'secondary';
      default:
        return 'info';
    }
  };

  const getStatusBadgeVariant = (status: User['status']) => {
    return status === 'active' ? 'success' : 'warning';
  };

  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <Link to="/">
          <Button variant="ghost">← Back to Home</Button>
        </Link>
        <h1 style={{ fontSize: 'var(--ha-font-size-3xl)', fontWeight: 'var(--ha-font-weight-bold)', marginTop: 'var(--ha-spacing-4)' }}>
          Remix Loader Demo
        </h1>
        <p style={{ color: 'var(--ha-color-text-secondary)', marginTop: 'var(--ha-spacing-2)' }}>
          Demonstrating server-side data loading with Remix loaders
        </p>
      </header>

      <section className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ha-spacing-4)' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Users</h2>
          <div style={{ fontSize: 'var(--ha-font-size-sm)', color: 'var(--ha-color-text-secondary)' }}>
            Loaded at: {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--ha-spacing-4)' }}>
          {users.map((user) => (
            <Card key={user.id}>
              <div slot="header">
                <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                  {user.name}
                </h3>
              </div>

              <div style={{ marginBottom: 'var(--ha-spacing-3)' }}>
                <p style={{ fontSize: 'var(--ha-font-size-sm)', color: 'var(--ha-color-text-secondary)' }}>
                  {user.email}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--ha-spacing-2)', alignItems: 'center' }}>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {user.status}
                </Badge>
              </div>

              <div slot="footer" className="card-footer">
                <Button variant="outline" size="small">View</Button>
                <Button variant="primary" size="small">Edit</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section" style={{ marginTop: 'var(--ha-spacing-12)' }}>
        <h2 className="section-title">How It Works</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          This page demonstrates Remix's server-side data loading with loaders. The user data
          is fetched on the server before the page is rendered, providing instant access to
          the data without client-side loading states.
        </p>

        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-4)', borderRadius: 'var(--ha-border-radius-md)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
            Key Benefits
          </h3>
          <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Data loaded on the server before rendering</li>
            <li>No loading spinners or skeleton screens needed</li>
            <li>Better SEO with server-rendered content</li>
            <li>Type-safe data with TypeScript</li>
            <li>Automatic revalidation on navigation</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
