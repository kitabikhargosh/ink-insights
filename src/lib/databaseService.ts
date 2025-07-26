import { connectToDatabase, getDatabase } from './database';
import { ObjectId, Document, Filter, UpdateFilter } from 'mongodb';

export class DatabaseService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private async getCollection() {
    const db = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  // Create a new document
  async create(data: Document): Promise<Document> {
    try {
      const collection = await this.getCollection();
      const result = await collection.insertOne(data);
      return { ...data, _id: result.insertedId };
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Create multiple documents
  async createMany(data: Document[]): Promise<Document[]> {
    try {
      const collection = await this.getCollection();
      const result = await collection.insertMany(data);
      return data.map((doc, index) => ({ ...doc, _id: result.insertedIds[index] }));
    } catch (error) {
      console.error(`Error creating documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Find a single document
  async findOne(filter: Filter<Document>): Promise<Document | null> {
    try {
      const collection = await this.getCollection();
      return await collection.findOne(filter);
    } catch (error) {
      console.error(`Error finding document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Find multiple documents
  async find(filter: Filter<Document> = {}, options?: { limit?: number; sort?: any }): Promise<Document[]> {
    try {
      const collection = await this.getCollection();
      let query = collection.find(filter);
      
      if (options?.sort) {
        query = query.sort(options.sort);
      }
      
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      return await query.toArray();
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update a single document
  async updateOne(filter: Filter<Document>, update: UpdateFilter<Document>): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const result = await collection.updateOne(filter, update);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update multiple documents
  async updateMany(filter: Filter<Document>, update: UpdateFilter<Document>): Promise<number> {
    try {
      const collection = await this.getCollection();
      const result = await collection.updateMany(filter, update);
      return result.modifiedCount;
    } catch (error) {
      console.error(`Error updating documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete a single document
  async deleteOne(filter: Filter<Document>): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne(filter);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete multiple documents
  async deleteMany(filter: Filter<Document>): Promise<number> {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteMany(filter);
      return result.deletedCount;
    } catch (error) {
      console.error(`Error deleting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Count documents
  async count(filter: Filter<Document> = {}): Promise<number> {
    try {
      const collection = await this.getCollection();
      return await collection.countDocuments(filter);
    } catch (error) {
      console.error(`Error counting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Find by ID
  async findById(id: string): Promise<Document | null> {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error(`Error finding document by ID in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update by ID
  async updateById(id: string, update: UpdateFilter<Document>): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const result = await collection.updateOne({ _id: new ObjectId(id) }, update);
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document by ID in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete by ID
  async deleteById(id: string): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document by ID in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// Create service instances for different collections
export const booksService = new DatabaseService('books');
export const authorsService = new DatabaseService('authors');
export const usersService = new DatabaseService('users');
export const reviewsService = new DatabaseService('reviews');
export const ordersService = new DatabaseService('orders'); 