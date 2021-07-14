import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

/**
 * Fix annoying TS2345 error when injecting InjectableRxStompConfig into
 * RxStomp.stompClient.configure method who don't need the rxStomp
 * configuration.
 */
export class FixedStompConfig extends InjectableRxStompConfig {
  constructor() {
    super();
  }

  beforeConnect?: () => void | Promise<any>;
}
