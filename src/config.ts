export const config = {
    api: {
        port: process.env.PORT ?? 3000
    },
    file: {
        uploadDir: '/uploads',
        maxSize: 1024 * 1024 * 100, // 100MB
        allowedMimeTypes: [
            'application/pdf',
            'text/plain',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.oasis.opendocument.spreadsheet',
            'application/vnd.oasis.opendocument.presentation',
        ],
        deleteEvery: 1000 * 60 * 60 * 2, // 2 hours
    },
    process: {
        processedDir: '/processed',
        queue: new Map(),
    }
}