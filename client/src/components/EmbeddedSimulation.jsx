import React from "react";

const EmbeddedSimulation = () => {
  // Your HTML content goes here
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <!-- Include your styles and scripts here -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
      <script src="sketch.js" type="text/javascript"></script>
    </head>
    <body>
      <!-- Your simulation content -->
      <div id="simulation-container"></div>
    </body>
    </html>
  `;

  return (
    <div
      id="embedded-simulation"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default EmbeddedSimulation;
