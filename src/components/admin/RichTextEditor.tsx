
import React, { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Quote,
  Code,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [isActive, setIsActive] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    updateContent();
    updateActiveStates();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const updateActiveStates = () => {
    setIsActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline')
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', active: isActive.bold },
    { icon: Italic, command: 'italic', active: isActive.italic },
    { icon: Underline, command: 'underline', active: isActive.underline },
    { icon: List, command: 'insertUnorderedList' },
    { icon: ListOrdered, command: 'insertOrderedList' },
    { icon: Quote, command: 'formatBlock', value: 'blockquote' },
    { icon: Code, command: 'formatBlock', value: 'pre' },
  ];

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={() => execCommand(button.command, button.value)}
              className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                button.active ? 'bg-gray-300' : ''
              }`}
            >
              <Icon size={16} />
            </button>
          );
        })}
        
        <div className="w-px bg-gray-300 mx-1" />
        
        <button
          type="button"
          onClick={insertLink}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
        >
          <Link size={16} />
        </button>
        
        <button
          type="button"
          onClick={insertImage}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
        >
          <Image size={16} />
        </button>
        
        <div className="w-px bg-gray-300 mx-1" />
        
        <button
          type="button"
          onClick={() => execCommand('undo')}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
        >
          <Undo size={16} />
        </button>
        
        <button
          type="button"
          onClick={() => execCommand('redo')}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
        >
          <Redo size={16} />
        </button>

        <select
          onChange={(e) => execCommand('formatBlock', e.target.value)}
          className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="div">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: content }}
        className="min-h-96 p-4 focus:outline-none prose max-w-none"
        style={{ 
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
};

export default RichTextEditor;
