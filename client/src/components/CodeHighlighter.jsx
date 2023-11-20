
export default function CodeHighlighter() {
  const notebookUrl = 'https://nbviewer.org/github/shrey-113/QKD-algorithms/blob/main/BB84%20Quantum%20Key%20Distribution.ipynb'; 

  return (
    <iframe
    title="Embedded Notebook"
    src={notebookUrl}
    width="100%"
    height="600px" 
    scrolling="yes"
  />
  );
}
