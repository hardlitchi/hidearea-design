export const gridStyles = `
  :host {
    display: block;
  }

  [part="grid"] {
    display: grid;
    width: 100%;
    box-sizing: border-box;
  }

  /* Align Items */
  :host([align-items="start"]) [part="grid"] {
    align-items: start;
  }

  :host([align-items="center"]) [part="grid"] {
    align-items: center;
  }

  :host([align-items="end"]) [part="grid"] {
    align-items: end;
  }

  :host([align-items="stretch"]) [part="grid"] {
    align-items: stretch;
  }

  /* Justify Items */
  :host([justify-items="start"]) [part="grid"] {
    justify-items: start;
  }

  :host([justify-items="center"]) [part="grid"] {
    justify-items: center;
  }

  :host([justify-items="end"]) [part="grid"] {
    justify-items: end;
  }

  :host([justify-items="stretch"]) [part="grid"] {
    justify-items: stretch;
  }
`;
