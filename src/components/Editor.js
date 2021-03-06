import React, { useEffect, useState, setState } from "react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { MdUndo, MdRedo } from "react-icons/md";
import { GoListUnordered, GoListOrdered, GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { BsTypeUnderline, BsCodeSlash } from "react-icons/bs";

import "draft-js/dist/Draft.css";
import "./RichText.css";

var initialDraft;
if (document.getElementById("para") != null) {
  initialDraft = document.getElementById("para").firstElementChild.innerHTML;
} else if ((initialDraft = localStorage.getItem("unsavedDraft") != null)) {
  initialDraft = localStorage.getItem("unsavedDraft");
} else {
  initialDraft = "<p><br></p>";
}

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(initialDraft)),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onClickUn() {
    this.onChange(EditorState.undo(this.state.editorState));
  }

  onClickRe() {
    this.onChange(EditorState.redo(this.state.editorState));
  }

  LastSave() {
    this.setState( {
      editorState: EditorState.createWithContent(stateFromHTML(localStorage.getItem("savedDraft"))),
    });
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    let html = stateToHTML(contentState);
    localStorage.setItem("unsavedDraft", html);

    function HasID() {
      localStorage.setItem("savedDraft", html);
      window.location.reload();
    }

    return (
      <div>
        {/* <button className="save-button" onClick={HasID}>OK</button> */}
        <div className="RichEditor-root">
          <div className="control-panel">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <button
              className="do-button"
              onClick={this.onClickRe.bind(this)}
              title="Redo"
            >
              <MdRedo size="20" />
            </button>
            <button
              className="do-button"
              onClick={this.onClickUn.bind(this)}
              title="Undo"
            >
              <MdUndo size="20" />
            </button>
            <span title="Load saved document" className="RichEditor-styleButton do-button" onClick={this.LastSave.bind(this)}>
              <b>LAST SAVE</b>
            </span>
          </div>
          <div id="editor-window" className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell the world..."
              ref="editor"
              spellCheck={false}
            />
          </div>
        </div>
        <BottomButtons
          whenClickedOK={HasID}
          whenClickedCancel={this.props.clickCancel}
        />
        <br />
        <ShowMeHTML inp={html} />
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        title={this.props.buttonTitle}
      >
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "P", style: "paragraph" },
  { label: "H1", style: "header-one", key: "H1, only use for main heading" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  {
    label: <GoListUnordered className="control-icon" size="18" />,
    style: "unordered-list-item",
    key: "Bulleted list, indent with Tab",
  },
  {
    label: <GoListOrdered className="control-icon" size="18" />,
    style: "ordered-list-item",
    key: "Ordered list, indent with Tab",
  },
  { label: "Blockquote", style: "blockquote" },
  { label: "Code", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.key ? type.key : type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          buttonTitle={type.key ? type.key : type.label}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  {
    label: <GoBold className="control-icon" size="18" />,
    style: "BOLD",
    key: "Bold",
  },
  {
    label: <FiItalic className="control-icon" size="18" />,
    style: "ITALIC",
    key: "Italic",
  },
  {
    label: <BsTypeUnderline className="control-icon-underline" size="20" />,
    style: "UNDERLINE",
    key: "Underline",
  },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.key ? type.key : type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          buttonTitle={type.key ? type.key : type.label}
        />
      ))}
    </div>
  );
};

function ShowMeHTML(props) {
  const [isShow, setShow] = useState(false);

  return (<>
      <a id="code" href={!isShow ? "#top" : "#code"}><BsCodeSlash size="25" className="code-button" title="HTML Code" onClick={() => (!isShow ? setShow(true) : setShow(false))} /></a>
    <div id="html-box">
      {isShow ? (
        <div
          id="raw-html"
          className="show-html show-raw-html"
          inp={props.inp}
          contenteditable="true"
        >
          {isShow ? props.inp : null}
        </div>
      ) : null}
    </div>
    </>
  );
}

function BottomButtons(props) {
  return (
    <div className="button-box">
      <button className="button-box-button" onClick={props.whenClickedOK}>
        OK
      </button>
      <a href="#top"><button className="button-box-button" onClick={props.whenClickedCancel}>
        CANCEL
      </button></a>
    </div>
  );
}

export default RichTextEditor;
