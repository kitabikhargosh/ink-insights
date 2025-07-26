import React, { useState } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Loader2, Database, CheckCircle, XCircle } from 'lucide-react';

export function DatabaseTest() {
  const { isConnected, isLoading, error, testConnection, connect, disconnect, services } = useDatabase();
  const [testResult, setTestResult] = useState<string>('');

  const handleTestConnection = async () => {
    setTestResult('');
    try {
      const result = await testConnection();
      setTestResult(result ? 'Connection successful!' : 'Connection failed!');
    } catch (err) {
      setTestResult(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleTestBooksService = async () => {
    try {
      const count = await services.books.count();
      setTestResult(`Books collection has ${count} documents`);
    } catch (err) {
      setTestResult(`Error testing books service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleCreateTestBook = async () => {
    try {
      const testBook = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'This is a test book created via the database service',
        price: 19.99,
        category: 'Fiction',
        createdAt: new Date(),
      };
      
      const result = await services.books.create(testBook);
      setTestResult(`Test book created with ID: ${result._id}`);
    } catch (err) {
      setTestResult(`Error creating test book: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Connection Test
        </CardTitle>
        <CardDescription>
          Test your MongoDB connection and database operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Connecting...</span>
            </div>
          ) : isConnected ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <Badge variant="default" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <Badge variant="destructive">Disconnected</Badge>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleTestConnection} disabled={isLoading}>
            Test Connection
          </Button>
          <Button onClick={connect} disabled={isConnected || isLoading}>
            Connect
          </Button>
          <Button onClick={disconnect} disabled={!isConnected || isLoading} variant="outline">
            Disconnect
          </Button>
          <Button onClick={handleTestBooksService} disabled={!isConnected || isLoading} variant="secondary">
            Test Books Service
          </Button>
          <Button onClick={handleCreateTestBook} disabled={!isConnected || isLoading} variant="secondary">
            Create Test Book
          </Button>
        </div>

        {/* Test Results */}
        {testResult && (
          <Alert>
            <AlertDescription>{testResult}</AlertDescription>
          </Alert>
        )}

        {/* Available Services */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Available Database Services:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Badge variant="outline">books</Badge>
            <Badge variant="outline">authors</Badge>
            <Badge variant="outline">users</Badge>
            <Badge variant="outline">reviews</Badge>
            <Badge variant="outline">orders</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 