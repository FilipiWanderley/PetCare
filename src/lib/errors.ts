import { NextResponse } from 'next/server';

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export type ErrorCode =
  // Auth
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_USER_NOT_FOUND'
  | 'AUTH_EMAIL_ALREADY_EXISTS'
  | 'AUTH_INVALID_TOKEN'
  | 'AUTH_TOKEN_EXPIRED'
  | 'AUTH_UNAUTHORIZED'
  | 'AUTH_FORBIDDEN'
  | 'AUTH_INVALID_DATA'
  | 'AUTH_REGISTRATION_FAILED'
  | 'AUTH_VERIFICATION_FAILED'

  // Validation
  | 'VALIDATION_ERROR'
  | 'VALIDATION_REQUIRED'
  | 'VALIDATION_EMAIL_INVALID'
  | 'VALIDATION_PASSWORD_TOO_SHORT'
  | 'VALIDATION_PASSWORD_UPPERCASE'
  | 'VALIDATION_PASSWORD_LOWERCASE'
  | 'VALIDATION_PASSWORD_NUMBER'
  | 'VALIDATION_NAME_TOO_SHORT'
  | 'VALIDATION_DATE_INVALID'
  | 'VALIDATION_PHONE_INVALID'

  // Appointment
  | 'APPOINTMENT_NOT_FOUND'
  | 'APPOINTMENT_SLOT_UNAVAILABLE'
  | 'APPOINTMENT_CREATE_FAILED'
  | 'APPOINTMENT_CANCEL_FAILED'
  | 'APPOINTMENT_PAST_DATE'
  | 'PET_CREATE_FAILED'
  | 'PET_FETCH_FAILED'

  // Products
  | 'PRODUCT_NOT_FOUND'
  | 'PRODUCT_OUT_OF_STOCK'

  // Cart
  | 'CART_EMPTY'
  | 'CART_ITEM_INVALID'

  // General
  | 'INTERNAL_ERROR'
  | 'INVALID_REQUEST'
  | 'NOT_FOUND'
  | 'DB_CONNECTION_FAILED'

  // Health
  | 'API_HEALTH_CHECK_FAILED'
  | 'API_ENDPOINT_DISABLED'
  | 'API_UNAUTHORIZED'
  | 'API_DIAGNOSE_FAILED'

  // Payment
  | 'PAYMENT_CREATE_FAILED'
  | 'PAYMENT_WEBHOOK_FAILED';

export const ErrorCodes = {
  // Auth
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_EMAIL_ALREADY_EXISTS: 'AUTH_EMAIL_ALREADY_EXISTS',
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',
  AUTH_INVALID_DATA: 'AUTH_INVALID_DATA',
  AUTH_REGISTRATION_FAILED: 'AUTH_REGISTRATION_FAILED',
  AUTH_VERIFICATION_FAILED: 'AUTH_VERIFICATION_FAILED',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  VALIDATION_REQUIRED: 'VALIDATION_REQUIRED',
  VALIDATION_EMAIL_INVALID: 'VALIDATION_EMAIL_INVALID',
  VALIDATION_PASSWORD_TOO_SHORT: 'VALIDATION_PASSWORD_TOO_SHORT',
  VALIDATION_PASSWORD_UPPERCASE: 'VALIDATION_PASSWORD_UPPERCASE',
  VALIDATION_PASSWORD_LOWERCASE: 'VALIDATION_PASSWORD_LOWERCASE',
  VALIDATION_PASSWORD_NUMBER: 'VALIDATION_PASSWORD_NUMBER',
  VALIDATION_NAME_TOO_SHORT: 'VALIDATION_NAME_TOO_SHORT',
  VALIDATION_DATE_INVALID: 'VALIDATION_DATE_INVALID',
  VALIDATION_PHONE_INVALID: 'VALIDATION_PHONE_INVALID',

  // Appointment
  APPOINTMENT_NOT_FOUND: 'APPOINTMENT_NOT_FOUND',
  APPOINTMENT_SLOT_UNAVAILABLE: 'APPOINTMENT_SLOT_UNAVAILABLE',
  APPOINTMENT_CREATE_FAILED: 'APPOINTMENT_CREATE_FAILED',
  APPOINTMENT_CANCEL_FAILED: 'APPOINTMENT_CANCEL_FAILED',
  APPOINTMENT_PAST_DATE: 'APPOINTMENT_PAST_DATE',

  // Pets
  PET_CREATE_FAILED: 'PET_CREATE_FAILED',
  PET_FETCH_FAILED: 'PET_FETCH_FAILED',

  // Products  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  PRODUCT_OUT_OF_STOCK: 'PRODUCT_OUT_OF_STOCK',

  // Cart
  CART_EMPTY: 'CART_EMPTY',
  CART_ITEM_INVALID: 'CART_ITEM_INVALID',

  // General
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  DB_CONNECTION_FAILED: 'DB_CONNECTION_FAILED',

  // Health
  API_HEALTH_CHECK_FAILED: 'API_HEALTH_CHECK_FAILED',
  API_ENDPOINT_DISABLED: 'API_ENDPOINT_DISABLED',
  API_UNAUTHORIZED: 'API_UNAUTHORIZED',
  API_DIAGNOSE_FAILED: 'API_DIAGNOSE_FAILED',

  // Payment
  PAYMENT_CREATE_FAILED: 'PAYMENT_CREATE_FAILED',
  PAYMENT_WEBHOOK_FAILED: 'PAYMENT_WEBHOOK_FAILED',
} as const;

interface ErrorDefinition {
  message: string;
  status: number;
  message_key?: string; // For i18n later
}

export const ERROR_CATALOG: Record<ErrorCode, ErrorDefinition> = {
  // Auth
  AUTH_INVALID_CREDENTIALS: {
    message: 'E-mail ou senha incorretos',
    status: HttpStatus.UNAUTHORIZED,
    message_key: 'auth.invalid_credentials',
  },
  AUTH_USER_NOT_FOUND: {
    message: 'Usuário não encontrado',
    status: HttpStatus.NOT_FOUND,
    message_key: 'auth.user_not_found',
  },
  AUTH_EMAIL_ALREADY_EXISTS: {
    message: 'Este e-mail já está cadastrado',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'auth.email_already_exists',
  },
  AUTH_INVALID_TOKEN: {
    message: 'Token inválido ou expirado',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'auth.invalid_token',
  },
  AUTH_TOKEN_EXPIRED: {
    message: 'Token expirado',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'auth.token_expired',
  },
  AUTH_UNAUTHORIZED: {
    message: 'Não autorizado',
    status: HttpStatus.UNAUTHORIZED,
    message_key: 'auth.unauthorized',
  },
  AUTH_FORBIDDEN: {
    message: 'Acesso negado',
    status: HttpStatus.FORBIDDEN,
    message_key: 'auth.forbidden',
  },
  AUTH_INVALID_DATA: {
    message: 'Dados inválidos',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'auth.invalid_data',
  },
  AUTH_REGISTRATION_FAILED: {
    message: 'Falha ao registrar usuário',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'auth.registration_failed',
  },
  AUTH_VERIFICATION_FAILED: {
    message: 'Falha na verificação do e-mail',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'auth.verification_failed',
  },

  // Validation
  VALIDATION_ERROR: {
    message: 'Erro de validação',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.error',
  },
  VALIDATION_REQUIRED: {
    message: 'Campo obrigatório',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.required',
  },
  VALIDATION_EMAIL_INVALID: {
    message: 'E-mail inválido',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.email_invalid',
  },
  VALIDATION_PASSWORD_TOO_SHORT: {
    message: 'A senha deve ter no mínimo 8 caracteres',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.password_too_short',
  },
  VALIDATION_PASSWORD_UPPERCASE: {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.password_uppercase',
  },
  VALIDATION_PASSWORD_LOWERCASE: {
    message: 'A senha deve conter pelo menos uma letra minúscula',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.password_lowercase',
  },
  VALIDATION_PASSWORD_NUMBER: {
    message: 'A senha deve conter pelo menos um número',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.password_number',
  },
  VALIDATION_NAME_TOO_SHORT: {
    message: 'O nome deve ter no mínimo 2 caracteres',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.name_too_short',
  },
  VALIDATION_DATE_INVALID: {
    message: 'Data inválida',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.date_invalid',
  },
  VALIDATION_PHONE_INVALID: {
    message: 'Telefone inválido',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'validation.phone_invalid',
  },

  // Appointment
  APPOINTMENT_NOT_FOUND: {
    message: 'Agendamento não encontrado',
    status: HttpStatus.NOT_FOUND,
    message_key: 'appointment.not_found',
  },
  APPOINTMENT_SLOT_UNAVAILABLE: {
    message: 'Horário indisponível',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'appointment.slot_unavailable',
  },
  APPOINTMENT_CREATE_FAILED: {
    message: 'Erro ao criar agendamento',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'appointment.create_failed',
  },
  APPOINTMENT_CANCEL_FAILED: {
    message: 'Erro ao cancelar agendamento',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'appointment.cancel_failed',
  },
  APPOINTMENT_PAST_DATE: {
    message: 'Não é possível agendar para uma data passada',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'appointment.past_date',
  },

  // Pets
  PET_CREATE_FAILED: {
    message: 'Erro ao cadastrar pet',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'pet.create_failed',
  },
  PET_FETCH_FAILED: {
    message: 'Erro ao buscar pets',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'pet.fetch_failed',
  },

  // Products
  PRODUCT_NOT_FOUND: {
    message: 'Produto não encontrado',
    status: HttpStatus.NOT_FOUND,
    message_key: 'product.not_found',
  },
  PRODUCT_OUT_OF_STOCK: {
    message: 'Produto fora de estoque',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'product.out_of_stock',
  },

  // Cart
  CART_EMPTY: {
    message: 'O carrinho está vazio',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'cart.empty',
  },
  CART_ITEM_INVALID: {
    message: 'Item inválido no carrinho',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'cart.item_invalid',
  },

  // General
  INTERNAL_ERROR: {
    message: 'Erro interno do servidor',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'generic.internal_error',
  },
  INVALID_REQUEST: {
    message: 'Requisição inválida',
    status: HttpStatus.BAD_REQUEST,
    message_key: 'generic.invalid_request',
  },
  NOT_FOUND: {
    message: 'Recurso não encontrado',
    status: HttpStatus.NOT_FOUND,
    message_key: 'generic.not_found',
  },
  DB_CONNECTION_FAILED: {
    message: 'Erro de conexão com o banco de dados',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'generic.db_connection_failed',
  },

  // Health
  API_HEALTH_CHECK_FAILED: {
    message: 'Falha na verificação de saúde da API',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'health.check_failed',
  },
  API_ENDPOINT_DISABLED: {
    message: 'Endpoint desativado',
    status: HttpStatus.SERVICE_UNAVAILABLE,
    message_key: 'api.endpoint_disabled',
  },
  API_UNAUTHORIZED: {
    message: 'Acesso não autorizado',
    status: HttpStatus.UNAUTHORIZED,
    message_key: 'api.unauthorized',
  },
  API_DIAGNOSE_FAILED: {
    message: 'Falha no diagnóstico da API',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'api.diagnose_failed',
  },

  // Payment
  PAYMENT_CREATE_FAILED: {
    message: 'Erro ao processar pagamento',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'payment.create_failed',
  },
  PAYMENT_WEBHOOK_FAILED: {
    message: 'Erro no processamento do webhook',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message_key: 'payment.webhook_failed',
  },
};

// Legacy support for direct message access
export const ErrorMessages = Object.fromEntries(
  Object.entries(ERROR_CATALOG).map(([key, value]) => [key, value.message])
) as Record<ErrorCode, string>;

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly message_key: string;
  public readonly isOperational: boolean = true;

  constructor(code: ErrorCode, message?: string, isOperational: boolean = true) {
    const def = ERROR_CATALOG[code];
    super(message || def.message);
    this.name = 'AppError';
    this.code = code;
    this.status = def.status;
    this.message_key = def.message_key || 'generic.unknown_error';
    this.isOperational = isOperational;
  }
}

/**
 * Standardized error response format for Server Actions
 */
export function errorResponse(code: ErrorCode | string, overrideMessage?: string) {
  const def = ERROR_CATALOG[code as ErrorCode];
  const message = overrideMessage || def?.message || 'Unknown Error';
  const status = def?.status || 500;
  const message_key = def?.message_key || 'generic.unknown_error';

  return {
    success: false,
    error: {
      code,
      message,
      message_key,
    },
    status,
  };
}
