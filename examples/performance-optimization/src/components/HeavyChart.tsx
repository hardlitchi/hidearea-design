import { Card } from '@hidearea-design/react';

export default function HeavyChart() {
  // Simulate a heavy chart component
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.floor(Math.random() * 100) + 20,
  }));

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card>
      <div slot="header">
        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
          Heavy Chart Component
        </h3>
      </div>

      <div style={{ padding: 'var(--ha-spacing-4)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--ha-spacing-2)', height: '200px' }}>
          {chartData.map((data) => (
            <div
              key={data.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--ha-spacing-2)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${(data.value / maxValue) * 100}%`,
                  backgroundColor: 'var(--ha-color-primary)',
                  borderRadius: 'var(--ha-border-radius-sm)',
                  transition: 'height 0.3s ease',
                }}
                title={`${data.month}: ${data.value}`}
              />
              <span style={{ fontSize: 'var(--ha-font-size-xs)', color: 'var(--ha-color-text-secondary)' }}>
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div slot="footer" style={{ color: 'var(--ha-color-text-secondary)', fontSize: 'var(--ha-font-size-sm)' }}>
        Monthly data visualization (lazily loaded)
      </div>
    </Card>
  );
}
