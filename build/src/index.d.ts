import { Readable } from 'stream';
import { GridFSBucketWriteStream, Db, ObjectID } from 'mongodb';
export declare function streamToGridFS(db: Db, filename: string, stream: Readable, metadata?: any): Promise<GridFSBucketWriteStream['id']>;
export declare function streamFromGridFS(db: Db, id: ObjectID): import("mongodb").GridFSBucketReadStream;
export declare function deleteFromGridFS(db: Db, id: ObjectID): void;
