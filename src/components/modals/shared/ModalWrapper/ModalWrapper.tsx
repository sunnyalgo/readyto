import { type FC } from "react"
import ReactModal from "react-modal"
import { ModalWrapperProps } from "./ModalWrapper.types"

const ModalWrapper: FC<ModalWrapperProps> = ({ children, className, closeModalHandler, ...props }) => {
  return (
    <ReactModal {...props} className="modal-wrapper">
      {closeModalHandler && (
        <button className="modal-wrapper__close-icon" onClick={closeModalHandler}>x</button>
      )}
      <div className="dark:bg-gray-900 w-full p-8 dark:border-gray-600 text-gray-500 dark:text-gray-400">{children}</div>
    </ReactModal>
  )
}

export default ModalWrapper
