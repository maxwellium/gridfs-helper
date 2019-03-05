import { Readable } from 'stream';

import { GridFSBucket, GridFSBucketWriteStream, Db, ObjectID } from 'mongodb';


export function streamToGridFS(
  db: Db,
  filename: string,
  stream: Readable,
  metadata?: any
): Promise<GridFSBucketWriteStream[ 'id' ]> {

  const bucket = new GridFSBucket( db ),
    uploadStream = bucket.openUploadStream( filename, { metadata } );

  return new Promise( ( resolve, reject ) => {
    uploadStream.once( 'finish', () => resolve( uploadStream.id ) );
    uploadStream.once( 'error', ( e ) => reject( e ) );
    stream.pipe( uploadStream );
  } );
}

export function streamFromGridFS( db: Db, id: ObjectID ) {
  const bucket = new GridFSBucket( db );
  return bucket.openDownloadStream( id );
}


export function deleteFromGridFS( db: Db, id: ObjectID ) {
  const bucket = new GridFSBucket( db );
  return bucket.delete( id );
}
