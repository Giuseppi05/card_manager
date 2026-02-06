import React from 'react';
import Header from '@/components/layout/Header/Header';
import BackgroundDecorations from '@/components/BackgroundDecorations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 relative z-0">
        <BackgroundDecorations />
        {children}
      </main>
    </div>
  );
};

export default Layout;