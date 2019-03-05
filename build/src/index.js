"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
function streamToGridFS(db, filename, stream, metadata) {
    const bucket = new mongodb_1.GridFSBucket(db), uploadStream = bucket.openUploadStream(filename, { metadata });
    return new Promise((resolve, reject) => {
        uploadStream.once('finish', () => resolve(uploadStream.id));
        uploadStream.once('error', (e) => reject(e));
        stream.pipe(uploadStream);
    });
}
exports.streamToGridFS = streamToGridFS;
function streamFromGridFS(db, id) {
    const bucket = new mongodb_1.GridFSBucket(db);
    return bucket.openDownloadStream(id);
}
exports.streamFromGridFS = streamFromGridFS;
function deleteFromGridFS(db, id) {
    const bucket = new mongodb_1.GridFSBucket(db);
    return bucket.delete(id);
}
exports.deleteFromGridFS = deleteFromGridFS;
//# sourceMappingURL=index.js.map