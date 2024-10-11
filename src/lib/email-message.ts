

export function emailMessage(url: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Monthly Newsletter</title>
        </head>
        <body>
        ${url}
        <h1>HeadSpace Newsletter</h1>
        <p>Kindly click on the link below to view this newsletter.</p>
        <a href="${url}">Download newsletter</a>
        </body>
        </html>
    `
}