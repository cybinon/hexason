import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";

export class AppService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    this.initApp().then((appConfigs) => {
      console.log(appConfigs);
    });
  }

  async runSeeds() {
    await runSeeders(this.dataSource);
  }
  async initApp() {
    const app = this.dataSource.getRepository("App");
    const appConfigs = await app.find();

    const appInit = appConfigs.reduce((acc: any, config: any) => {
      acc[config.type] = acc[config.type] || {};
      acc[config.type][config.name] = config.config;
      return acc;
    }, {});

    return appInit
  }
}