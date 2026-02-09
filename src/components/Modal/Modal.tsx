import styles from "./Modal.module.css"

interface ModalProps {
  open: boolean
  title: string
  message: string
  onClose: () => void
}

export function Modal({ open, title, message, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Jogar novamente</button>
      </div>
    </div>
  )
}