import Email from 'email-templates';
import path from 'path';

const email = new Email({
    send: true,
    views: {
        root: path.resolve(__dirname, 'templates'),
        options: { extension: 'ejs' }
    },
    message: {
        from: `Contento <${process.env.GMAIL_USER}>`
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
            subject: 'Reset your password'
        },
        locals: options.data
    });
}

export function sendVerificationEmail(options: IEmailOptions) {
    return email.send({
        template: 'email-verification',
        message: {
            to: options.to,
            subject: 'Verify your email'
        },
        locals: options.data
    });
}
