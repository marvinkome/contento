import Email from 'email-templates';
import path from 'path';

const email = new Email({
    send: true,
    views: {
        root: path.resolve(__dirname, 'templates'),
        options: { extension: 'ejs' }
    },
    message: {
        from: process.env.GMAIL_USER
    },
    transport: {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || '',
            pass: process.env.GMAIL_PASSWORD || ''
        }
    }
});

interface IEmailOptions {
    to: string;
    data: any;
}

export function sendPasswordResetLink(options: IEmailOptions) {
    return email.send({
        template: 'reset-password',
        message: {
            to: options.to,
            subject: 'Password Reset Email'
        },
        locals: options.data
    });
}
