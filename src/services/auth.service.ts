import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDTO } from '@/lib/schemas/auth';

export class AuthService {
  /**
   * Finds a user by email.
   */
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Finds a user by confirmation token.
   */
  static async findByConfirmationToken(token: string) {
    return prisma.user.findUnique({
      where: { confirmationToken: token },
    });
  }

  /**
   * Creates a new user with hashed password and confirmation token.
   */
  static async register(data: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const confirmationToken = uuidv4();
    const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        confirmationToken,
        confirmationTokenExpires,
        emailVerified: null,
      },
    });

    return { user, confirmationToken };
  }

  /**
   * Verifies a user's email.
   */
  static async verifyUserEmail(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        confirmationToken: null,
        confirmationTokenExpires: null,
      },
    });
  }

  /**
   * Validates password against hash.
   */
  static async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
