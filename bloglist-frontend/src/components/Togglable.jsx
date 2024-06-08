import { useState, forwardRef, useImperativeHandle } from 'react'


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>Close</button>
        <div style={showWhenVisible} >{props.children}</div>
    </>
  )
})

export default Togglable

