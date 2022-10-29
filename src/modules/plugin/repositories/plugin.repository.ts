import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FilterPluginDAO } from '../dao/plugin.dao';
import { Plugin } from '../entities/plugin.entity';

@Injectable()
export class PluginRepository extends Repository<Plugin> {
  constructor(dataSource: DataSource) {
    super(Plugin, dataSource.manager);
  }

  /**
   * Returns an action that fetches the plugins
   */
  async fetch(
    select: (keyof Plugin)[] = [],
    filters: FilterPluginDAO,
  ): Promise<Plugin[]> {
    return await this.find({
      select: select.length > 0 ? select : null,
      where: [
        {
          ...filters,
        },
      ],
    });
  }

  /**
   * finds entity which matches the id
   */
  async findById(
    id: number,
    relations?: (keyof Plugin)[] | string[],
  ): Promise<Plugin> {
    return await this.findOne({ where: { id }, relations: relations });
  }

  /**
   * finds entity which matches the code
   */
  async findByCode(
    code: string,
    relations?: (keyof Plugin)[] | string[],
  ): Promise<Plugin> {
    return await this.findOne({ where: { code }, relations: relations });
  }
}
