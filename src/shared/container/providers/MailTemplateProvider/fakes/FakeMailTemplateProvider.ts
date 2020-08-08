import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
export default FakeMailTemplateProvider;
