import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const { buttonText, children } = props
  const [visible, setIsVisable] = useState(false)

  const toggleVisibility = () => {
    setIsVisable(!visible)
  }
  const displayWhenVisible = { display: visible ? '' : 'none' }
  const displayWhenHidden = { display: visible ? 'none' : '' }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <button style={displayWhenHidden} onClick={() => toggleVisibility()}>
        {buttonText}
      </button>
      <div style={displayWhenVisible}>
        {children}
        <button onClick={() => toggleVisibility()}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
