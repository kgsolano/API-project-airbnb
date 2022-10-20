// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "./SignupForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sign-up-modal-div">
      <button onClick={() => setShowModal(true)} className='sign-up-modal'>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </div>
  );
}

export default SignupFormModal;
