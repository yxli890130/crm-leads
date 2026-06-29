'use client';

interface PasswordResetConfirmProps {
  open: boolean;
  accountName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PasswordResetConfirm({ open, accountName, onClose, onConfirm }: PasswordResetConfirmProps) {
  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={handleBackdrop}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#1d2129' }}>密码重置确认</h2>
        <p className="text-sm mb-3" style={{ color: '#4e5969' }}>
          确定要重置账号「<span className="font-medium" style={{ color: '#1d2129' }}>{accountName}</span>」的登录密码吗？
        </p>
        <p className="text-xs rounded-md px-3 py-2 mb-6" style={{ color: '#86909c', backgroundColor: '#f8f9fa' }}>
          确认后密码将重置为默认密码 123456。
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
            style={{ backgroundColor: '#2e6cf7' }}
          >
            确认重置
          </button>
        </div>
      </div>
    </div>
  );
}
