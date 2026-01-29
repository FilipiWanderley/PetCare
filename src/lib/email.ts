import nodemailer from 'nodemailer';

/**
 * Sends a confirmation email to the user with a verification token.
 * Uses environment variables for SMTP configuration (Production) or Ethereal Email (Development).
 * 
 * @param {string} email - Recipient's email address.
 * @param {string} token - Unique verification token.
 * @returns {Promise<void>}
 */
export async function sendConfirmationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm-email?token=${token}`;
  
  let transporter;

  // 1. Production / Configured SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } 
  // 2. Production Fallback (Error)
  else if (process.env.NODE_ENV === 'production') {
    console.error('[EMAIL] SMTP credentials missing in production environment');
    return;
  } 
  // 3. Development: Ethereal Email
  else {
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
      // 4. Fallback: Log to console if Ethereal fails
      console.warn('[EMAIL] Failed to create test account, falling back to console log');
      console.log('----------------------------------------');
      console.log(`To: ${email}`);
      console.log(`Confirmation Link: ${confirmationLink}`);
      console.log('----------------------------------------');
      return;
    }
  }

  try {
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
      console.log('[EMAIL] Message sent: %s', info.messageId);
      console.log('[EMAIL] Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } else {
      console.log(`[EMAIL] Sent to ${email} (MessageID: ${info.messageId})`);
    }
  } catch (error) {
    console.error('[EMAIL] Error sending email:', error);
    // Non-blocking error for the user flow, but critical for ops
  }
}
