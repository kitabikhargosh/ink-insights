# MongoDB Database Setup Guide

This guide explains how to set up and use MongoDB with your Ink Insights application.

## Prerequisites

- MongoDB Atlas account (or local MongoDB instance)
- Node.js and npm/yarn installed
- Your project dependencies installed

## Setup Instructions

### 1. Environment Configuration

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values:
   ```env
   VITE_MONGODB_URI=mongodb+srv://kitabikhargosh:<your_actual_password>@cluster0.8oqdvwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   VITE_DATABASE_NAME=ink-insights
   ```

   **Important**: Replace `<your_actual_password>` with your actual MongoDB password.

### 2. MongoDB Atlas Setup (if using Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster or use an existing one
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace the connection string in your `.env` file

### 3. Database Collections

The application is set up to work with the following collections:
- `books` - Store book information
- `authors` - Store author information
- `users` - Store user accounts
- `reviews` - Store book reviews
- `orders` - Store purchase orders

## Usage

### Using the Database Hook

```tsx
import { useDatabase } from '../hooks/useDatabase';

function MyComponent() {
  const { isConnected, isLoading, error, services } = useDatabase();

  if (isLoading) return <div>Connecting to database...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isConnected) return <div>Not connected to database</div>;

  // Use database services
  const handleCreateBook = async () => {
    const newBook = await services.books.create({
      title: 'My Book',
      author: 'John Doe',
      price: 29.99
    });
  };

  return <div>Database is connected!</div>;
}
```

### Available Database Services

Each service provides the following methods:

#### Create Operations
```tsx
// Create a single document
const book = await services.books.create({
  title: 'Book Title',
  author: 'Author Name',
  price: 19.99
});

// Create multiple documents
const books = await services.books.createMany([
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' }
]);
```

#### Read Operations
```tsx
// Find all documents
const allBooks = await services.books.find();

// Find with filter
const fictionBooks = await services.books.find({ category: 'Fiction' });

// Find with options
const recentBooks = await services.books.find(
  {},
  { 
    sort: { createdAt: -1 }, 
    limit: 10 
  }
);

// Find by ID
const book = await services.books.findById('book_id_here');

// Find one document
const book = await services.books.findOne({ title: 'Specific Title' });

// Count documents
const count = await services.books.count({ category: 'Fiction' });
```

#### Update Operations
```tsx
// Update one document
const updated = await services.books.updateOne(
  { title: 'Old Title' },
  { $set: { title: 'New Title' } }
);

// Update by ID
const updated = await services.books.updateById(
  'book_id_here',
  { $set: { price: 24.99 } }
);

// Update multiple documents
const updatedCount = await services.books.updateMany(
  { category: 'Fiction' },
  { $inc: { price: 5 } }
);
```

#### Delete Operations
```tsx
// Delete one document
const deleted = await services.books.deleteOne({ title: 'Book Title' });

// Delete by ID
const deleted = await services.books.deleteById('book_id_here');

// Delete multiple documents
const deletedCount = await services.books.deleteMany({ category: 'Outdated' });
```

### Testing the Database

Use the `DatabaseTest` component to test your database connection:

```tsx
import { DatabaseTest } from '../components/DatabaseTest';

function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <DatabaseTest />
    </div>
  );
}
```

## Security Considerations

1. **Never commit your `.env` file** - Make sure it's in your `.gitignore`
2. **Use environment variables** - Don't hardcode database credentials
3. **Limit database permissions** - Use read-only users where possible
4. **Validate input data** - Always validate data before inserting into the database
5. **Use connection pooling** - The current setup handles this automatically

## Error Handling

The database services include comprehensive error handling:

```tsx
try {
  const result = await services.books.create(bookData);
  console.log('Book created:', result);
} catch (error) {
  console.error('Failed to create book:', error);
  // Handle the error appropriately
}
```

## Troubleshooting

### Common Issues

1. **Connection failed**: Check your MongoDB URI and credentials
2. **Authentication error**: Verify your username and password
3. **Network error**: Check your internet connection and firewall settings
4. **Database not found**: Ensure the database name is correct

### Debug Mode

To enable debug logging, you can modify the database configuration:

```tsx
// In src/lib/database.ts
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add these for debugging
  loggerLevel: 'debug',
  logger: console.log
});
```

## Next Steps

1. Set up your environment variables
2. Test the database connection using the `DatabaseTest` component
3. Start using the database services in your components
4. Consider adding data validation using Zod schemas
5. Implement proper error boundaries for database operations

For more information, refer to the [MongoDB Node.js Driver documentation](https://docs.mongodb.com/drivers/node/). 