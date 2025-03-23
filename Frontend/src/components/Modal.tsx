import React from 'react';
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, prompt }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Prompt Details</h2>
        <p className="mb-4">{prompt}</p>
        <Button onClick={onClose} className="w-full">Close</Button>
      </div>
    </div>
  );
};

export default Modal;