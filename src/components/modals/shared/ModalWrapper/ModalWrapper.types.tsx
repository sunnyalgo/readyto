import { PropsWithChildren } from "react"
import ReactModal from "react-modal"

export type ModalWrapperProps = PropsWithChildren<
  ReactModal.Props & {
    closeModalHandler?: () => void
  }
>
