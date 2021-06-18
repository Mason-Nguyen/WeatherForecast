import "../../../scss/core/ToggleComponent.scss"
import React, { useState } from "react"

const ToggleComponent = (data) => {
    const [isToggle, setIsToggle] = useState(data.isDefaultOpen)

    const _onToggleButtonClick = () => {
        setIsToggle(!isToggle)
    }

    const _buttonText = `Click to ${isToggle ? 'Hide Map' : 'Show Map'}`

    return <>
        <button id='toggleButton' className='wButton' onClick={_onToggleButtonClick}>
            {_buttonText}
        </button>
        { isToggle && data.children }
    </>
}

export default ToggleComponent