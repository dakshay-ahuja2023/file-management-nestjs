import { Injectable } from '@nestjs/common';
import { Status } from 'src/shared/constants/status.enum';
import { PluginDAO } from '../dto/Plugin.dto';
import { Plugin } from '../entities/plugin.entity';
import { PluginRepository } from '../repositories/plugin.repository';

@Injectable()
export class PluginService {
  constructor(private readonly pluginRepository: PluginRepository) {}

  /**
   * Returns an action that fetches the plugins.
   *
   * @param {PluginDAO} filters
   * @returns {Promise<Plugin[]>}
   */
  async fetch(): Promise<Plugin[]> {
    const filters = new PluginDAO();
    filters.status = Status.ACTIVE;
    return await this.pluginRepository.fetch(['id', 'name', 'code'], filters);
  }
}
