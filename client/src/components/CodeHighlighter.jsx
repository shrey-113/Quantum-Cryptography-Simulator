export default function CodeHighlighter({ link }) {
  const notebookUrl = link;

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
