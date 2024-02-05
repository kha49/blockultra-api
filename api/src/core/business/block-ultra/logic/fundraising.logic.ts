export class BusinessFundraising {

  static getHomeFundraisingProps(datas: any) {
    return datas.map((c: any) => {
      return {
        name            : c.name,
        announceDate    : c.announceDate ? new Date(parseFloat(c.announceDate)): null,
        raise           : parseFloat(c.fundsRaised),
        round           : "",
        valuation       : "",
        funds           : c.investors,
        category        : {name: c.category},
        slug            : c.slug,
        icon            : c.image,
        stage           : c.stage
      };
    });
  }
}

export default BusinessFundraising;
