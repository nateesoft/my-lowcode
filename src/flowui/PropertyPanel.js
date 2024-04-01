import React, { memo, useEffect, useState } from "react"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      onComponentChange({
        id: props.id,
        label: label,
        component: props.component
      })
    }
  }

  useEffect(() => {
    if (props.label) {
      setLabel(props.label)
    } else {
      setLabel("")
    }
  }, [props])

  if (!props.id) {
    return <></>
  }

  return (
    <div className="panel">
      <span>Property</span>
      {props && (
        <div className="property">
          <div>Detail</div>
          <div>id: {props.id}</div>
          <div>
            label:{" "}
            <input
              type="text"
              value={label}
              onChange={(data) => setLabel(data.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div>type: {props.type}</div>
        </div>
      )}
    </div>
  )
})

export default PropertyPanel
