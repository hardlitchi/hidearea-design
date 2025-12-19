// Import all components from the core package
import * as HideareaDesign from '../../packages/core/dist/index.es.js';

console.log('All components:', Object.keys(HideareaDesign));

// Use one component to prevent dead code elimination
const button = document.createElement('ha-button');
button.textContent = 'Test';
document.body.appendChild(button);
