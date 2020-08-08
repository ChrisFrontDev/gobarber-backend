import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate(): Promise<string> {
    return 'Mail content';
  }
}
export default FakeMailTemplateProvider;
