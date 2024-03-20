import { ParsedType, TextParseAtom } from '@/atoms/TextParseAtom'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useSetAtom } from 'jotai'
import JSON5 from 'json5'
import Papa from 'papaparse'
import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

/**
 * ドラッグ＆ドロップでファイルをセットするコンポーネント
 * @example https://goodpatch-tech.hatenablog.com/entry/react-file-dragdorp
 */
const DragDropZone = ({ type, label }: { type: ParsedType; label: string }) => {
  const updateTextParse = useSetAtom(TextParseAtom.update)

  const onDropAccepted = (files: File[]) => {
    const file = files[0]
    if (file.type !== 'text/csv') {
      alert('CSVファイル以外が選択されました')
      return
    }
    Papa.parse(file, {
      complete: (results) => {
        const jsonText = JSON5.stringify(results.data, null, 2)
        updateTextParse(type, jsonText)
      },
      error: () => {
        alert('ファイル解析でエラーが発生しました')
      },
      header: true,
      dynamicTyping: true,
    })
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept } = useDropzone({
    accept: {
      'text/csv': ['.csv', '.CSV'],
    },
    onDropAccepted,
  })

  const baseStyle = useMemo(
    () => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '200px',
      height: '100%',
      padding: '20px',
      borderWidth: '2px',
      borderRadius: '8px',
      borderColor: '#bbbbbb',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#888888',
      outline: 'none',
      cursor: 'pointer',
    }),
    []
  )

  const focusedStyle = useMemo(
    () => ({
      borderColor: '#44AA55',
    }),
    []
  )

  const acceptStyle = useMemo(
    () => ({
      borderColor: '#44AA55',
      backgroundColor: '#fafafa',
      color: '#44AA55',
    }),
    []
  )

  const style = useMemo(
    () =>
      ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        // Workaround of react-dropzone: flexDirection is not assignable to CSSProperties
        // Reference: https://github.com/cssinjs/jss/issues/1344
      }) as React.CSSProperties,

    [isFocused, isDragAccept, baseStyle, focusedStyle, acceptStyle]
  )

  return (
    <div className="dragdrop-hitarea-wrap">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <FileUploadIcon />
        <p>{label}</p>
      </div>
    </div>
  )
}

export default DragDropZone
