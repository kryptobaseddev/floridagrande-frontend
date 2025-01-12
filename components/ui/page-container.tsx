interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`container mx-auto px-4 py-6 md:py-8 ${className}`}>
      {children}
    </div>
  );
} 