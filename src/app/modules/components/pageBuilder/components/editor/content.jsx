import JoditReact from 'jodit-react'
import React from 'react'

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.editorConfig = {
      readonly: false,
      autofocus: true,
      tabIndex: 1,

      // defaultActionOnPaste: 'insert_clear_html',
      toolbarAdaptive: false,
      toolbarButtonSize: 'small',
      beautyHTML: true,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,

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
      ],
      extraButtons: ['uploadImage'],
    }
  }

  onChange = (value) => {
    this.props.onChange(value)
  }

  setContent = (newContent) => {
    this.props.onChange(newContent)
  }

  render() {
    return (
      <React.Fragment>
        <JoditReact
          value={this.props.content || ''}
          config={this.editorConfig}
          onChange={this.onChange.bind(this)}
          onBlur={(newContent) => this.setContent(newContent)}
        />
      </React.Fragment>
    )
  }
}
export default Content
