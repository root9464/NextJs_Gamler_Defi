import { z } from 'zod/v4';
import { validateResult } from '../utils/zod.utils';

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_JETTON_MASTER: z.string(),
});

const ServerEnvSchema = z.object({});

type ClientEnv = z.infer<typeof ClientEnvSchema>;
type ServerEnv = z.infer<typeof ServerEnvSchema>;

export class ENVsManager {
  private static clientInstance: ENVsManager | null = null;
  private static serverInstance: ENVsManager | null = null;

  public readonly client: ClientEnv;
  public readonly server: ServerEnv;

  private constructor(env: Record<string, unknown>, isServer: boolean) {
    if (isServer) {
      this.client = validateResult(env, ClientEnvSchema);
      this.server = validateResult(env, ServerEnvSchema);
    } else {
      const clientEnv = this.getClientEnv();
      this.client = validateResult(clientEnv, ClientEnvSchema);
      this.server = {} as ServerEnv;
    }
  }

  private getClientEnv(): Record<string, unknown> {
    const env: Record<string, unknown> = {};

    if (process.env.NEXT_PUBLIC_JETTON_MASTER) {
      env.NEXT_PUBLIC_JETTON_MASTER = process.env.NEXT_PUBLIC_JETTON_MASTER;
    }

    return env;
  }

  public static initServer(env: Record<string, unknown> = process.env): ENVsManager {
    if (ENVsManager.serverInstance) return ENVsManager.serverInstance;
    if (typeof window !== 'undefined') throw new Error('Server ENVsManager cannot be initialized on client side');

    ENVsManager.serverInstance = new ENVsManager(env, true);
    return ENVsManager.serverInstance;
  }

  public static getClient(): ENVsManager {
    if (ENVsManager.clientInstance) return ENVsManager.clientInstance;

    ENVsManager.clientInstance = new ENVsManager({}, false);
    return ENVsManager.clientInstance;
  }

  public static getInstance(): ENVsManager {
    return typeof window === 'undefined' ? ENVsManager.initServer() : ENVsManager.getClient();
  }
}

export const ENVs = ENVsManager.getInstance();
