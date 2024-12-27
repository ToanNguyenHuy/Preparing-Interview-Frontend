// src/components/FeedbackPanel.jsx
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function FeedbackPanel({ item, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg mb-4 shadow-sm">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Q{index + 1}.</span>
          <h3 className="font-medium">{item.question}</h3>
        </div>
        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Your Answer:</h4>
            <p className="text-gray-700">{item.userAns}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Example Answer:</h4>
            <p className="text-gray-700">{item.ExampleAns}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Feedback:</h4>
            <p className="text-gray-700">{item.feedback}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Feedback:</h4>
            <p className="text-gray-700">{item.rating}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackPanel;