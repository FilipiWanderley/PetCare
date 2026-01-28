
import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(email: string, token: string) {
  // In a real app, you would use environment variables for these
  // For this demo/dev, we'll use Ethereal for testing or console log
  
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Use configured SMTP (Gmail, etc)
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else if (process.env.NODE_ENV === 'production') {
    // Fallback for production if no env vars (should not happen)
    console.error('SMTP credentials missing in production');
    return;
  } else {
    // Development: Use Ethereal
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (e) {
      console.log('Failed to create test account, falling back to console log');
      const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm-email?token=${token}`;
      console.log('----------------------------------------');
      console.log(`To: ${email}`);
      console.log(`Confirmation Link: ${confirmationLink}`);
      console.log('----------------------------------------');
      return;
    }
  }

  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm-email?token=${token}`;

  const info = await transporter.sendMail({
    from: '"Pet Care" <noreply@petcare.com>',
    to: email,
    subject: 'Confirme seu e-mail - Pet Care',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a4a4a;">Bem-vindo ao Pet Care!</h2>
        <p>Obrigado por se cadastrar. Para ativar sua conta, por favor confirme seu endereço de e-mail clicando no botão abaixo:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${confirmationLink}" style="background-color: #F5A623; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Confirmar E-mail</a>
        </div>
        <p>Ou copie e cole o link abaixo no seu navegador:</p>
        <p><a href="${confirmationLink}">${confirmationLink}</a></p>
        <p>Se você não criou esta conta, pode ignorar este e-mail.</p>
      </div>
    `,
  });

  if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) {
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } else {
    console.log(`[EMAIL] Sent to ${email} (MessageID: ${info.messageId})`);
  }
}
