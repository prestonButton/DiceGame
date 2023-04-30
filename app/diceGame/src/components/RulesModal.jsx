import React from 'react';

function Modal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-lg"
        style={{ zIndex: 50 }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
        style={{ zIndex: 100 }}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-blue-500 font-bold text-lg">Modal Title</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            X
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-gray-800">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus tellus
            vitae velit sollicitudin, ac scelerisque diam sodales. Proin eget dictum nunc. Duis
            euismod quam ac justo aliquet bibendum. Nulla facilisi. Sed sed ipsum ac odio pharetra
            pulvinar sit amet non nibh.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;