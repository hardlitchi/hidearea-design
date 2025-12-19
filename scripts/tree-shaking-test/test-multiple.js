// Import multiple commonly used components
import { Button, Input, Alert, Card, Badge } from '../../packages/core/dist/index.es.js';

console.log('Components:', { Button, Input, Alert, Card, Badge });

// Use the components
const button = document.createElement('ha-button');
const input = document.createElement('ha-input');
document.body.appendChild(button);
document.body.appendChild(input);
