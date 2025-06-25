import close from "/images/clos.svg";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}
const Modal = ({ isOpen, onClose, text }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <img src={close} alt="close" onClick={onClose} className="modal_img" />
        <p className="modal_text">{text}</p>
      </div>
    </div>
  );
};

export default Modal;
