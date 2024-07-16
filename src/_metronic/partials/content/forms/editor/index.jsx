import JoditEditor, {Jodit} from 'jodit-react'
import {useEffect, useMemo, useRef, useState} from 'react'
import {toast} from 'react-toastify'
import {uploadImageFile} from '../../../../../app/library/api.helper'
import {extractTextFromHtml, isUndefinedNullOrWhiteSpaceString} from '../../../../../common'

const TextEditor = ({ id, name, limitChars, limitHtml, placeholder, defaultValue, setTextEditor, onBlur, onChange, onLoad, }) => {
  const editor = useRef(null)
  // NOTE: THIS STATE IS A MUST IF YOU USE WANT TO USE onChange EVENT...
  const [value] = useState(isUndefinedNullOrWhiteSpaceString(defaultValue) ? '' : defaultValue);

  useEffect(() => {
    if (typeof onLoad !== 'function') {
      return
    }

    onLoad({
      target: {
        id: id,
        name: name,
      },
    })
  }, [])

  const config = useMemo(() => {
    return {
      readonly: false,
      limitChars: limitChars ?? 999999999,
      limitHTML: limitHtml !== false,
      // uploader: {
      //   url: UPLOAD_IMAGE_FILE,
      //   process: async () => await imageUpload(editor),
      //   insertImageAsBase64URI: true,
      // },
      placeholder: placeholder ?? '',
      spellcheck: true,
      innerHeight: 600,
      toolbarSticky: false,
      controls: {
        fontsize: {
          list: Jodit.atom([
            5, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56, 92, 100,
          ]),
        },
        uploadImage: {
          name: 'Upload image to webmanza',
          iconURL: 'https://admin.webmanza.com/media/upload.png',
          exec: async (editor) => {
            await imageUpload(editor)
          },
        },
        codeBlock: {
          name: 'Code Block',
          iconURL:
            'https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png',
          exec: async (editor) => {
            const pre = editor.selection.j.createInside.element('pre')
            pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px' // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
            pre.innerHTML = `${editor.selection.html}`
            editor.selection.insertNode(pre)
          },
        },
        font: {
          list: Jodit.atom({
            '': 'Default',
            'Helvetica,sans-serif': 'Helvetica',
            'Arial,Helvetica,sans-serif': 'Arial',
            'Georgia,serif': 'Georgia',
            'Impact,Charcoal,sans-serif': 'Impact',
            'Tahoma,Geneva,sans-serif': 'Tahoma',
            "'Times New Roman',Times,serif": 'Times New Roman',
            'Verdana,Geneva,sans-serif': 'Verdana',
            'Roboto,sans-serif': 'Roboto',
            'Montserrat,sans-serif': 'Montserrat',
            'Gabarito,sans-serif': 'Gabarito',
            "'Dancing Script', cursive": 'Dancing Script',
          }),
        },
      },
      autofocus: false,
      tabIndex: 3,

      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      // defaultActionOnPaste: 'insert_clear_html',
      toolbarAdaptive: false,

      // placeholder: 'Write something awesome ...',
      beautyHTML: true,
      toolbarButtonSize: 'large',
      buttons: [
        'bold',
        'italic',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'video',
        'table',
        'link',
        '|',
        'left',
        'center',
        'right',
        'justify',
        '|',
        'undo',
        'redo',
        '|',
        'source',
        'fullsize',
        // 'image',
      ],
      extraButtons: ['uploadImage', 'codeBlock'],
    }
  }, [])

  // useEffect(() => {
  //   console.log('im called from useEffect')
  //   // uploadImageButton()
  //   // codeBlockButton()
  // }, [])

  // Jodit.defaultOptions.controls.uploadImage = {
  //   name: 'Upload image to webmanza',
  //   iconURL: 'https://admin.webmanza.com/media/upload.png',
  //   exec: async (editor) => {
  //     await imageUpload(editor)
  //   },
  // }

  // const uploadImageButton = () => {
  //   console.log('im called from upload image btn')
  //   Jodit.defaultOptions.controls.uploadImage = {
  //     name: 'Upload image to webmanza',
  //     iconURL: 'https://admin.webmanza.com/media/upload.png',
  //     exec: async (editor) => {
  //       await imageUpload(editor)
  //     },
  //   }
  // }

  // const codeBlockButton = () => {
  //   Jodit.defaultOptions.controls.codeBlock = {
  //     name: 'Code Block',
  //     iconURL:
  //       'https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png',
  //     exec: async (editor) => {
  //       const pre = editor.selection.j.createInside.element('pre')
  //       pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px' // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
  //       pre.innerHTML = `${editor.selection.html}`
  //       editor.selection.insertNode(pre)
  //     },
  //   }
  // }

  const imageUpload = (editor) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async function () {
      const imageFile = input.files[0]

      if (!imageFile) {
        return
      }

      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        return
      }

      const imageInfo = await uploadImageFile(imageFile)
      if (imageInfo && imageInfo.status_code === 200) {
        insertImage(editor, imageInfo.uploaded_files[0])
      } else {
        toast.error(imageInfo.message)
      }
    }
  }

  const insertImage = (editor, url) => {
    const image = editor.selection.j.createInside.element('img')
    image.setAttribute('src', url)
    editor.selection.insertNode(image)
  }

  const onContentChangedAsync = async (newValue) => {
    if (typeof onChange === 'function') {
      const text = extractTextFromHtml(newValue)

      onChange({
        target: {
          id: id,
          name: name,
          value: newValue,
          extractedTextValue: text,
          isEmpty: !text.length,
        },
      })
    }

    if (typeof setTextEditor === 'function') {
      setTextEditor(newValue)
    }
  }

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
      onChange={onContentChangedAsync}
    />
  )
}

export default TextEditor
