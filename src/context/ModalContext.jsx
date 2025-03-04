import { createContext, useState, useContext } from "react";

// Create Context
const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

// Context Provider
export const ModalProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Show modal with a message
  const showModal = (message) => {
    setModalMessage(message);
    setIsVisible(true);

    // Auto-hide after 2 seconds
    setTimeout(() => setIsVisible(false), 1000);
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50" onClick={() => setIsVisible(false)}>
          <div className="bg-gray-600 p-4 rounded-md shadow-md h-[120px] w-[300px] flex flex-col justify-center items-center" onClick={() => setIsVisible(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20 text-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>

            <p className="text-lg font-semibold text-white">{modalMessage}</p>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};