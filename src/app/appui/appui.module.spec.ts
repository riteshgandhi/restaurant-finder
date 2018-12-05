import { AppuiModule } from './appui.module';

describe('AppuiModule', () => {
  let appuiModule: AppuiModule;

  beforeEach(() => {
    appuiModule = new AppuiModule();
  });

  it('should create an instance', () => {
    expect(appuiModule).toBeTruthy();
  });
});
