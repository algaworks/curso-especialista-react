export default function countWordsInMarkdown (markdownString: string) {
  let text = markdownString

  if (text === '')
    return 0

  // Comments
  text = text.replace(/<!--(.*?)-->/gi, '');
  // Tabs to spaces
  text = text.replace(/\t/gi, ' ');
  // More than 1 space to 4 spaces
  text = text.replace(/[ ]{2,}/gi, ' ');
  // Footnotes
  text = text.replace(/^\\[[^]]*\\][^(].*/gi, '');
  // Indented blocks of code
  text = text.replace(/^( {4,}[^-*]).*/gi, '');
  // Custom header IDs
  text = text.replace(/\\{#.*}/gi, '');
  // Replace newlines with spaces for uniform handling
  text = text.replace(/\n/gi, ' ');
  // Remove images
  text = text.replace(/!\\[[^\\]]*\\]\\([^)]*\\)/gi, '');
  // Remove HTML tags
  text = text.replace(/<\/?[^>]*>/gi, '');
  // Remove special characters
  text = text.replace(/[#*`~\\\-–^=<>+|/:]/gi, '');
  // Remove footnote references
  text = text.replace(/\\[[0-9]*\\]/gi, '');
  // Remove enumerations
  text = text.replace(/[0-9#]*\\./gi, '');
  // Remove duplicated chars
  text = text.replace(/\\s{2,}/gi, ' ').trim();
  // Replace whitespace with separator
  text = text.replace(/\s/gi, "|");
  // replace multiples separators
  text = text.replace(/\|{2,99}/gi, '|')
  // Slip words and ignore the separator
  return text.split('|').length;
}