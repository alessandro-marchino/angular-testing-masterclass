import { ComponentHarness } from '@angular/cdk/testing';

export class TabsHarness extends ComponentHarness {
  static hostSelector = 'tabs';

  async getTabLabels(): Promise<string[]> {
    return [];
  }
  async getActiveLabel(): Promise<string|undefined> {
    return;
  }
  async clickTabByIndex(index: number): Promise<void> {
  }
}
