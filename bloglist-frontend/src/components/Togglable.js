import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

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
      <Button
        variant="contained"
        size="small"
        style={displayWhenHidden}
        onClick={() => toggleVisibility()}
      >
        {buttonText}
      </Button>
      <div style={displayWhenVisible}>
        {children}
        <Button
          variant="contained"
          size="small"
          onClick={() => toggleVisibility()}
        >
          cancel
        </Button>
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
