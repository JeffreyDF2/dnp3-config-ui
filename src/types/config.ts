export interface Configuration {
    address: string;
    scheduledApplyTime?: string;
    mapping: {
      binaryInputs: MappingEntry[];
      analogInputs: MappingEntry[];
      commandOutputs: MappingEntry[];
    };
    connection: {
      connectionType: "TCP/IP" | "RS-485";
      tcpipConfig: {
        ipAddress: string;
        port: string;
        localAddress: string;
        remoteAddress: string;
        period: string;
        timeout: string;
      };
      rs485Config: {
        baudRate: string;
        dataBits: string;
        parity: string;
        stopBits: string;
      };
      sav5Config: {
        sav5Key: string;
      };
    };
    fsi: {
      isEnabled: boolean;
      pollingFrequency: number;
      unsolicitedResponseEnabled: boolean;
      class1: SeverityClassSettings;
      class2: SeverityClassSettings;
      class3: SeverityClassSettings;
    };
  }
  
  export interface MappingEntry {
    pointName: string;
    group: number;
    variation: number;
    index: number;
    class: 1 | 2 | 3;
    unsolicitedEnabled?: boolean;
  }

  export interface SeverityClassSettings {
    maximumValue: number;
    minimumValue: number;
  }
  