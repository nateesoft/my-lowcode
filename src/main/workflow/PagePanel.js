import * as React from "react"
import GjsEditor from "@grapesjs/react"
import Fab from "@mui/material/Fab"
import CloseIcon from "@mui/icons-material/ExpandMore"

const gjsOptions = {
  height: "auto",
  storageManager: false,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff"
    ],
    pages: [
      {
        name: "Home page",
        component: `<h1>GrapesJS React Custom UI</h1>`
      }
    ]
  }
}

const PagePanel = (props) => {
  const onEditor = (editor) => {
    console.log('editor.TraitManager.types.button:', editor.TraitManager.types.button)
    window.editor = editor
  }

  if (!props.show) {
    return <></>
  }

  return (
    <>
      <Fab
        variant="extended"
        color="info"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={props.onClose}
      >
        <CloseIcon />
        Back to Flow
      </Fab>
      <GjsEditor
        className="gjs-custom-editor text-white bg-slate-900"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic"
          },
          {
            id: "grapesjs-plugin-forms",
            src: "https://unpkg.com/grapesjs-plugin-forms"
          },
          {
            id: "grapesjs-tabs",
            src: "https://unpkg.com/grapesjs-tabs"
          },
          {
            id: "grapesjs-component-countdown",
            src: "https://unpkg.com/grapesjs-component-countdown"
          },
          {
            id: "grapesjs-custom-code",
            src: "https://unpkg.com/grapesjs-custom-code"
          },
          {
            id: "grapesjs-plugin-ckeditor",
            src: "https://unpkg.com/grapesjs-plugin-ckeditor"
          },
          {
            id: "grapesjs-navbar",
            src: "https://unpkg.com/grapesjs-navbar"
          },
          {
            id: "grapesjs-preset-webpage",
            src: "https://unpkg.com/grapesjs-preset-webpage"
          },
          {
            id: "grapesjs-tui-image-editor",
            src: "https://unpkg.com/grapesjs-tui-image-editor"
          },
          {
            id: "grapesjs-tooltip",
            src: "https://unpkg.com/grapesjs-tooltip"
          },
          {
            id: "grapesjs-typed",
            src: "https://unpkg.com/grapesjs-typed"
          }
        ]}
        onEditor={onEditor}
      />
    </>
  )
}

export default PagePanel
