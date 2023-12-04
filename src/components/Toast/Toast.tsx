import { type FC } from "react"
import { ToastProps } from "./Toast.types"

const Toast: FC<ToastProps> = ({ children, timestamp }) => {
  return (
    <div className="w-96">
      <p className='toast__contents'>{children}</p>
      {timestamp && <p className='toast__time'>Today {timestamp}</p>}
    </div>
  )
}

export default Toast
