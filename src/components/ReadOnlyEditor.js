import React from 'react';
import {Editor, ConvertFromRaw} from 'draft-js';

const ReadOnlyEditor = (props) => {
  const storedState =  ConvertFromRaw(JSON.parse(props.storedState));
  return (
     <div className="readonly-editor">
       <Editor editorState={storedState} readOnly={true} /> 
     </div>
  );
}

export default ReadOnlyEditor;