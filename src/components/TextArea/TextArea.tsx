import { Dispatch, SetStateAction } from "react"

type TextAreaPorps = {
  placeholder: string,
  setPrompt: Dispatch<SetStateAction<string>>
}

const TextArea = ({ placeholder, setPrompt }: TextAreaPorps) => {

  return (
    <>
      <textarea
        className="app-input"
        placeholder={placeholder}
        onChange={(e) => setPrompt(e.target.value)}
        rows={10}
        cols={40}
      />

    </>
  )
}

export default TextArea