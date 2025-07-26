import { useState, useEffect, useCallback } from 'react';
import { testConnection, connectToDatabase, closeDatabase } from '../lib/database';
import { booksService, authorsService, usersService, reviewsService, ordersService } from '../lib/databaseService';

export interface DatabaseState {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useDatabase() {
  const [state, setState] = useState<DatabaseState>({
    isConnected: false,
    isLoading: true,
    error: null,
  });

  const testDatabaseConnection = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const isConnected = await testConnection();
      setState({
        isConnected,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        isConnected: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect to database',
      });
    }
  }, []);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await connectToDatabase();
      setState({
        isConnected: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        isConnected: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect to database',
      });
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await closeDatabase();
      setState({
        isConnected: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to disconnect from database',
      }));
    }
  }, []);

  useEffect(() => {
    testDatabaseConnection();
  }, [testDatabaseConnection]);

  return {
    ...state,
    testConnection: testDatabaseConnection,
    connect,
    disconnect,
    services: {
      books: booksService,
      authors: authorsService,
      users: usersService,
      reviews: reviewsService,
      orders: ordersService,
    },
  };
} 