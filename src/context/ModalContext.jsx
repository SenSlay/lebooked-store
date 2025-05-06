import PropTypes from 'prop-types';
import { createContext, useState, useContext } from 'react';

// Create Context
const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

// Context Provider
export const ModalProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Show modal with a message
  const showModal = (message, content = null) => {
    setModalMessage(message);
    setModalContent(content);
    setIsVisible(true);

    // Auto-hide after 2 seconds
    setTimeout(() => setIsVisible(false), 1000);
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {isVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          onClick={() => setIsVisible(false)}
        >
          <div
            className="bg-gray-200 p-4 rounded-md shadow-xl h-[120px] w-[300px] flex flex-col justify-center items-center text-center"
            onClick={() => setIsVisible(false)}
          >
            {modalContent}
            
            <p className="text-lg font-semibold text-blue-700">{modalMessage}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
