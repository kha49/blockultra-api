import { EntityManager } from 'typeorm';
import { SaveCoinService } from './save-coin';
import { SaveCategory } from './save-category';
import { SaveTrending } from './save-trending';
import { SaveGainer } from './save-gainer';
import { SaveLoser } from './save-loser';
import { SaveGlobal } from './save-global';
import { SaveTokenUnlock } from './save-token-unlock';
import { SaveExchangeSpot } from './save-exchange-spot';
import { SaveTag } from './save-tag';
import { SaveCoinIeoIdo } from './save-coin-ieo-ido';
import { SaveFundraising } from './save-fundraising';
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { SaveIeoIdoTopIdoLaunchPad } from './save-ieoido-top-ido-launch-pad';
import { SaveFunds } from './save-funds';
import { SaveCategoryVolumn } from './save-category-volumn';
import { SaveIdoVolumn } from './save-ido-volume';
import { SaveIeoIdoProject } from './save-ieo-ido-project';
import { SaveFearGreed } from './save-fear-greed';
import { SaveGas } from './save-gas';

const amqp = require('amqplib');

export class RabitMqService {
  saveCoin;
  saveCategory;
  saveTrending;
  saveFundraising;
  saveFunds;
  saveGainer;
  saveLoser;
  saveIeoIdoProject;
  saveGlobal;
  saveTokenUnlock;
  saveExchange;
  saveTag;
  saveCoinIeoIdo;
  saveIeoIdoTopIdoLaunchPad;
  saveCategoryVolumn;
  saveIdoVolumn;
  saveFearGreed;
  saveGas;
  constructor(private readonly em: EntityManager) {
    this.saveCoin                  = new SaveCoinService(this.em);
    this.saveCategory              = new SaveCategory(this.em);
    this.saveTrending              = new SaveTrending(this.em);
    this.saveFundraising           = new SaveFundraising(this.em);
    this.saveFunds                 = new SaveFunds(this.em);
    this.saveGainer                = new SaveGainer(this.em);
    this.saveLoser                 = new SaveLoser(this.em);
    this.saveIeoIdoProject         = new SaveIeoIdoProject(this.em);
    this.saveGlobal                = new SaveGlobal(this.em);
    this.saveTokenUnlock           = new SaveTokenUnlock(this.em);
    this.saveExchange              = new SaveExchangeSpot(this.em);
    this.saveTag                   = new SaveTag(this.em);
    this.saveCoinIeoIdo            = new SaveCoinIeoIdo(this.em);
    this.saveIeoIdoTopIdoLaunchPad = new SaveIeoIdoTopIdoLaunchPad(this.em);
    this.saveCategoryVolumn        = new SaveCategoryVolumn(this.em);
    this.saveIdoVolumn             = new SaveIdoVolumn(this.em);
    this.saveFearGreed             = new SaveFearGreed(this.em);
    this.saveGas                   = new SaveGas(this.em);
  }

  async handleCaseQueue(dataJson: any) {
    switch (dataJson.key) {
      case 'COIN':
        this.saveCoin.execute(dataJson.value, 'key');
        break;
      case 'CATEGORY':
        this.saveCategory.execute(dataJson.value, 'id');
        break;
      case 'TRENDING':
        this.saveTrending.execute(dataJson.value, 'key');
        break;
      case 'FUNDRAISING':
        this.saveFundraising.execute(dataJson.value);
        break;
      case 'FUNDS':
        this.saveFunds.execute(dataJson.value, 'key');
        break;
      case 'GAINER':
        this.saveGainer.execute(dataJson.value, 'key');
        break;
      case 'LOSER':
        this.saveLoser.execute(dataJson.value, 'key');
        break;
      case 'IEO_IDO_UPCOMING':
        this.saveIeoIdoProject.execute(dataJson.value, 'key', 'status');
        break;
      case 'IEO_IDO_ENDED':
        this.saveIeoIdoProject.execute(dataJson.value, 'key', 'status');
        break;
      case 'GLOBAL':
        this.saveGlobal.execute(dataJson.value);
        break;
      case 'TOKEN_UNLOCK':
        this.saveTokenUnlock.execute(dataJson.value, 'key');
        break;
      case 'EXCHANGE':
        this.saveExchange.execute(dataJson.value);
        break;
      case 'SUB_CATEGORY':
        this.saveTag.execute(dataJson.value, 'id');
        break;
      case 'COIN_IEO_IDO':
        this.saveCoinIeoIdo.execute(dataJson.value);
        break;
      case 'IEO_IDO_TOP_IDO_LAUNCH_PAD':
        this.saveIeoIdoTopIdoLaunchPad.execute(dataJson.value, 'key');
        break;
      case 'CATEGORY_VOLUMN':
        this.saveCategoryVolumn.execute(dataJson.value);
        break;
      case 'IDO_VOLUMN':
        this.saveIdoVolumn.execute(dataJson.value);
        break;
      case "ETH_GAS_PRICE":
        this.saveGas.execute(dataJson.value);
        break;
      case "FEAR_GREED":
        this.saveFearGreed.execute(dataJson.value);
          break;
    }
  }

  async consumeQueue() {
    const connection = await amqp.connect(process.env.RABBITMQ_HOST);
    const channel = await connection.createChannel();

    const queueName = ConstVariableUtil.SEED_QUEUE_NAME;
    channel.assertQueue(queueName, { durable: false });

    console.log(
      `RabbitMq connected and waiting for messages in ${queueName}. To exit press CTRL+C`,
    );

    channel.consume(
      queueName,
      (msg: any) => {
        const message = msg.content.toString();
        const dataJson = JSON.parse(message);
        this.handleCaseQueue(dataJson);
      },
      { noAck: true },
    );
  }
}
