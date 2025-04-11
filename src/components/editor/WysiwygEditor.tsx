import { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, 
  List, ListOrdered, Link as LinkIcon, Undo, Redo } from 'lucide-react';

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const WysiwygEditor = ({ content, onChange }: WysiwygEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        validate: href => /^https?:\/\//.test(href),
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = () => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-wrap gap-2 mb-2 p-2 border-b">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-accent' : ''}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-accent' : ''}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleMark('underline').run()}
          className={editor.isActive('underline') ? 'bg-accent' : ''}
          type="button"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-accent' : ''}
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-accent' : ''}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-accent' : ''}
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          type="button"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          type="button"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none min-h-[200px] p-4" />
    </div>
  );
};

export default WysiwygEditor;
