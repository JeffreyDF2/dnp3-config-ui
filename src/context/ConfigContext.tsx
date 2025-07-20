import type { Configuration, MappingEntry } from "@/types/config";
import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialConfig: Configuration = {
  address: "",
  scheduledApplyTime: "",
  mapping: {
    binaryInputs: [] as MappingEntry[],
    analogInputs: [] as MappingEntry[],
    commandOutputs: [] as MappingEntry[],
  },
  connection: {
    connectionType: "TCP/IP",
    tcpipConfig: {
      ipAddress: "",
      port: "",
      localAddress: "",
      remoteAddress: "",
      period: "",
      timeout: "",
    },
    rs485Config: {
      baudRate: "",
      dataBits: "",
      parity: "",
      stopBits: "",
    },
    sav5Config: {
      sav5Key: "",
    },
  },
  fsi: {
    isEnabled: false,
    pollingFrequency: 0,
    unsolicitedResponseEnabled: false,
    class1: {
      maximumValue: 100,
      minimumValue: 75,
    },
    class2: {
      maximumValue: 74,
      minimumValue: 50,
    },
    class3: {
      maximumValue: 49,
      minimumValue: 0,
    },
  },
};

type Action =
  | { type: "SET_ADDRESS"; payload: string }
  | { type: "UPDATE_SCHEDULE"; payload: string }
  | { type: "SET_BASIC_MAPPING"; payload: Partial<Configuration["mapping"]> }
  | { type: "UPDATE_MAPPING"; payload: Partial<Configuration["mapping"]> }
  | { type: "UPDATE_CONNECTION"; payload: Partial<Configuration["connection"]> }
  | { type: "UPDATE_FSI"; payload: Partial<Configuration["fsi"]> };

function configReducer(state: Configuration, action: Action): Configuration {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "UPDATE_SCHEDULE":
      return { ...state, scheduledApplyTime: action.payload };
    case "SET_BASIC_MAPPING":
      return { ...state, mapping: { ...state.mapping, ...action.payload } };
    case "UPDATE_MAPPING":
      return { ...state, mapping: { ...state.mapping, ...action.payload } };
    case "UPDATE_CONNECTION":
      return {
        ...state,
        connection: { ...state.connection, ...action.payload },
      };
    case "UPDATE_FSI":
      return { ...state, fsi: { ...state.fsi, ...action.payload } };
    default:
      return state;
  }
}

const ConfigContext = createContext<{
  state: Configuration;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(configReducer, initialConfig);
  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
};
