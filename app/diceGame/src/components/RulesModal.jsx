import React, { useRef } from "react";

function Modal({ show, onClose }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-xl z-40"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 shadow-lg z-50"
      >
        <div className="relative p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-blue-500 font-bold text-lg">Modal Title</h2>
          <button
            className="text-red-500 text-xl absolute top-2 right-2 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded-full focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-gray-800">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque maximus tellus vitae velit sollicitudin, ac scelerisque
            diam sodales. Proin eget dictum nunc. Duis euismod quam ac justo
            aliquet bibendum. Nulla facilisi. Sed sed ipsum ac odio pharetra
            pulvinar sit amet non nibh.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
