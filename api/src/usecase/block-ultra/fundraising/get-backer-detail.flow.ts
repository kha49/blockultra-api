import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic';
import { IBackerService } from '../../../core/interfaces/backer';

export class GetBackerDetailFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(backer_id: number) {
    const query = await this.service.getQueryBuilder();
    query.where({ id: backer_id });
    const backer = await query.getOne();
    // if not have ane in [socials, description, totalBalance, unicorns, raised, leadRounds]
    // backer.slug, backer.name
    // socials and description crawled by one source
    if (backer.socials == null) {
      const socials = await this.service.getSocials(backer.slug);
      if (socials) {
        backer.socials = socials.links;
        backer.description = socials.description;
        await this.service.update(backer);
      }
    }
    // if (backer.description == null) await this.getDescription()

    // unicorns, leadRounds and raised crawled by one source
    if (backer.unicorns == null) {
      const unicorns = await this.service.getUnicorns();
      if (Object.keys(unicorns).length !== 0) {
        const props = BusinessBacker.getProperties(unicorns, backer.name);
        const newBacker = {...backer, leadRounds: props.leadRounds, raised: props.raised, unicorns: props.unicorns};
        if(props.leadRounds || props.raised || props.unicorns){
          await this.service.update(newBacker);
        }
      }
    }
    // if (backer.raised == null) await this.getRaised()
    // if (backer.leadRounds == null) await this.getLeadRounds()
    if (backer.totalBalance == null) await this.getTotalBalance();
    const result = BusinessBacker.getBackerDetail(backer);
    return result;
  }

  async getTotalBalance() {}

  // async getDescription() {}
  // async getRaised() {}
  // async getLeadRounds() {}
}

export default GetBackerDetailFlow;
