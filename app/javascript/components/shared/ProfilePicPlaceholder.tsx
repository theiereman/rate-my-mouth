interface ProfilePicPlaceholderProps {
  className?: string;
}

export default function ProfilePicPlaceholder({
  className = "",
}: ProfilePicPlaceholderProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center overflow-hidden">
        <span className="material-symbols-outlined text-primary-600">face</span>
      </div>
    </div>
  );
}
