

export function emailHTMLMessage(newsletterName: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <title>${newsletterName} Newsletter</title>
        </head>
        <body>
        <h1>HeadSpace Newsletter</h1>
        <p>Kindly see attached the newsletter for ${newsletterName}, enjoy :)</p>
        </body>
        </html>
    `
}