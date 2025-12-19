// Import only Button component
import { Button } from '../../packages/core/dist/index.es.js';

console.log('Button:', Button);

// Use the component
const button = document.createElement('ha-button');
button.textContent = 'Test';
document.body.appendChild(button);
