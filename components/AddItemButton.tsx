import { Plus } from 'lucide-react';

interface AddItemButtonProps {
  onClick: () => void;
}

export default function AddItemButton({ onClick }: AddItemButtonProps) {
  return (
    <div className="fixed bottom-32 right-4 z-30">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
