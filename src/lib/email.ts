import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { logger } from '@/lib/logger';

/**
 * Sends a confirmation email to the user with a verification token.
 * Uses Resend (preferred), SMTP, or Ethereal (Dev).
 *
 * @param {string} email - Recipient's email address.
 * @param {string} token - Unique verification token.
 * @returns {Promise<void>}
 */
export async function sendConfirmationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/confirm-email?token=${token}`;

  const htmlContent = `
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
  `;

  // 1. Resend (Preferred)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Pet Care <onboarding@resend.dev>',
        to: email,
        subject: 'Confirme seu e-mail - Pet Care',
        html: htmlContent,
      });

      if (error) {
        throw new Error(error.message);
      }

      logger.info(`[EMAIL] Sent via Resend to ${email}`);
      return;
    } catch (error) {
      logger.error('[EMAIL] Resend failed', { error: String(error) });
      throw error; // Explicit failure as requested
    }
  }

  let transporter;

  // 2. Production / Configured SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // 3. Production Fallback (Error)
  else if (process.env.NODE_ENV === 'production') {
    const errorMsg = '[EMAIL] No email provider configured (Resend or SMTP) in production';
    logger.error(errorMsg);
    throw new Error(errorMsg); // Explicit failure
  }
  // 4. Development: Ethereal Email
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
      // 5. Fallback: Log to console if Ethereal fails
      logger.warn('[EMAIL] Failed to create test account, falling back to console log', {
        error: String(e),
      });
      logger.info('----------------------------------------');
      logger.info(`To: ${email}`);
      logger.info(`Confirmation Link: ${confirmationLink}`);
      logger.info('----------------------------------------');
      return;
    }
  }

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Pet Care" <noreply@petcare.com>',
        to: email,
        subject: 'Confirme seu e-mail - Pet Care',
        html: htmlContent,
      });

      if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) {
        logger.info('[EMAIL] Message sent', {
          messageId: info.messageId,
          previewUrl: nodemailer.getTestMessageUrl(info),
        });
      } else {
        logger.info(`[EMAIL] Sent via SMTP to ${email}`, { messageId: info.messageId });
      }
      return; // Success
    } catch (error) {
      logger.warn(`[EMAIL] Attempt ${attempt} failed`, { error: String(error) });

      if (attempt >= maxRetries) {
        logger.error('[EMAIL] Failed to send email after retries', { error });
        throw error; // Explicit failure
      }

      // Exponential backoff: 1s, 2s, 4s...
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
    }
  }
}
