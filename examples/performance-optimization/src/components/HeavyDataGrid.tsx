import { Card } from '@hidearea-design/react';

export default function HeavyDataGrid() {
  // Simulate a heavy component with lots of data
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  }));

  return (
    <Card>
      <div slot="header">
        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
          Heavy Data Grid Component
        </h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ha-color-border-primary)' }}>
              <th style={{ padding: 'var(--ha-spacing-3)', textAlign: 'left' }}>ID</th>
              <th style={{ padding: 'var(--ha-spacing-3)', textAlign: 'left' }}>Name</th>
              <th style={{ padding: 'var(--ha-spacing-3)', textAlign: 'left' }}>Value</th>
              <th style={{ padding: 'var(--ha-spacing-3)', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--ha-color-border-primary)' }}>
                <td style={{ padding: 'var(--ha-spacing-3)' }}>{row.id}</td>
                <td style={{ padding: 'var(--ha-spacing-3)' }}>{row.name}</td>
                <td style={{ padding: 'var(--ha-spacing-3)' }}>{row.value}</td>
                <td style={{ padding: 'var(--ha-spacing-3)' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--ha-border-radius-sm)',
                      backgroundColor: row.status === 'Active' ? 'var(--ha-color-success)' : 'var(--ha-color-warning)',
                      color: 'white',
                      fontSize: 'var(--ha-font-size-sm)',
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div slot="footer" style={{ color: 'var(--ha-color-text-secondary)', fontSize: 'var(--ha-font-size-sm)' }}>
        Showing 20 of {data.length} items (lazily loaded)
      </div>
    </Card>
  );
}
