'use client';

import { Dashboard } from '@/components/Dashboard';
import { checkIfAuthenticated } from '@/utils';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
