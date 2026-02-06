'use client';
import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeConfig {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  schema?: string;
}

interface UseSupabaseRealtimeProps {
  config: RealtimeConfig;
  onPayload: (payload: any) => void;
  enabled?: boolean;
}

export const useSupabaseRealtime = ({ 
  config, 
  onPayload, 
  enabled = true 
}: UseSupabaseRealtimeProps) => {
  const supabase = createClient();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const configRef = useRef(config);
  
  // Actualizar config ref cuando cambie
  configRef.current = config;

  useEffect(() => {
    if (!enabled) return;

    const channelName = `realtime-${config.table}-${Date.now()}`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        {
          event: config.event || '*',
          schema: config.schema || 'public',
          table: config.table,
          ...(config.filter && { filter: config.filter }),
        },
        onPayload
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [enabled, config.table, config.event, config.filter, config.schema]);

  const disconnect = () => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
  };

  return { disconnect };
};

// Hook específico para cambios de usuario
export const useUserRealtime = (userId: string | null, onUserUpdate: (userData: any) => void) => {
  return useSupabaseRealtime({
    config: {
      table: 'User',
      event: 'UPDATE',
      filter: userId ? `id=eq.${userId}` : undefined,
    },
    onPayload: (payload) => onUserUpdate(payload.new),
    enabled: !!userId,
  });
};

// Hook para múltiples suscripciones
export const useMultipleRealtime = (subscriptions: Array<{
  config: RealtimeConfig;
  onPayload: (payload: any) => void;
  enabled?: boolean;
}>) => {
  const channels = subscriptions.map(subscription => 
    useSupabaseRealtime(subscription)
  );

  const disconnectAll = () => {
    channels.forEach(channel => channel.disconnect());
  };

  return { disconnectAll };
};