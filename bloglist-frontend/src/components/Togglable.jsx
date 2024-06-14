import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
        <div className='togglableBlogForm'>
            <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
            <button style={showWhenVisible} onClick={toggleVisibility}>Close</button>
            <div style={showWhenVisible} >{props.children}</div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable

