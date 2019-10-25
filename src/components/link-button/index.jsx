import React from 'react'
import './index.less'

export default function LinkButton(props) {
  // ...props 通过...透传
  return <button className="link-button" {...props} />
}

