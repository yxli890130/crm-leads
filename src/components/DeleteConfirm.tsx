'use client';

interface DeleteConfirmProps {
  open: boolean;
  leadName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirm({ open, leadName, onClose, onConfirm }: DeleteConfirmProps) {
  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#1d2129' }}>确认删除</h2>
        <p className="text-sm mb-6" style={{ color: '#4e5969' }}>
          确定要删除线索「<span className="font-medium" style={{ color: '#1d2129' }}>{leadName}</span>」吗？此操作不可撤销。
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md transition-colors"
            style={{ color: '#4e5969', borderColor: '#e5e6eb', backgroundColor: '#ffffff' }}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white rounded-md transition-all hover:shadow-md"
            style={{ backgroundColor: '#f53f3f' }}
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  );
}
