import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MessageBubble({ role, content, books = [], isTyping = false }) {
  const isUser = role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-1`}>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
        {!isUser && (
          <div className="w-10 h-10 rounded-full shadow flex items-center justify-center mr-2 p-2 mt-auto bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-6 h-6"
              fill="currentColor"
            >
              <path d="M0 96C0 43 43 0 96 0l96 0 0 190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5L352 0l32 0 32 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L96 512c-53 0-96-43-96-96L0 96zM64 416c0 17.7 14.3 32 32 32l256 0 0-64L96 384c-17.7 0-32 14.3-32 32z" />
            </svg>
          </div>
        )}
        <div className={`px-4 py-2 rounded-2xl shadow text-sm max-w-[80%] ${isUser ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white text-black rounded-bl-sm'}`}>
          {isTyping ? (
            <TypingDots />
          ) : (
            content
          )}
        </div>
      </div>

      {/* Recommended books for assistant */}
      {!isUser && books?.length > 0 && (
        <ul className="flex flex-col gap-2 mt-2">
          {books.map((book, idx) => (
            <Link
              key={idx}
              to={`/books/${book.id}`}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition flex items-center"
            >
              <p className="text-sm font-semibold mr-1 text-blue-700 truncate max-w-48" title={book.title}>{book.title}</p>
              {book.author && <p className="text-xs text-gray-500">by {book.author}</p>}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

const TypingDots = () => {
  return (
    <div className="flex space-x-1">
      <span className="dot animate-bounce1">●</span>
      <span className="dot animate-bounce2">●</span>
      <span className="dot animate-bounce3">●</span>
    </div>
  );
};

MessageBubble.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string, 
    })
  ),
  isTyping: PropTypes.bool,
};

export default MessageBubble;