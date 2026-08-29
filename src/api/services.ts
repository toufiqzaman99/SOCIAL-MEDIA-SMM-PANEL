import type { Service } from '@/types'
import { getService, services } from '@/data/services'
import { delay } from './client'

/**
 * Catalog service. The catalog is static configuration in this demo;
 * in production these functions would hit GET /services.
 */
export async function listServices(): Promise<Service[]> {
  await delay(300)
  return services
}

export async function fetchService(id: string): Promise<Service | null> {
  await delay(300)
  return getService(id) ?? null
}
