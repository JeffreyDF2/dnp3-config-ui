export const tooltips = {
    address: "Unique DNP3 address for the device (0-255).",
    scheduledApplyTime: "Optional time to apply the configuration (ISO format).",
  
    mapping: {
      binaryInputs: "Maps binary input points from the device.",
      analogInputs: "Maps analog input points from the device.",
      commandOutputs: "Maps control output points to the device.",
    },
  
    connection: {
      connectionType: "Select between TCP/IP or RS-485 communication method.",
      
      tcpipConfig: {
        ipAddress: "IP address of the remote DNP3 outstation.",
        port: "TCP port number used for the DNP3 connection.",
        localAddress: "Local DNP3 address (1-65519).",
        remoteAddress: "Remote DNP3 address (1-65519).",
        period: "Time interval between connection attempts (in ms).",
        timeout: "Time to wait before retrying or failing (in ms).",
      },
  
      rs485Config: {
        baudRate: "Speed of serial communication in bits per second.",
        dataBits: "Number of data bits in a communication frame (usually 8).",
        parity: "Error-checking method: None, Even, or Odd.",
        stopBits: "Stop bits used to indicate end of transmission.",
      },
  
      sav5Config: {
        sav5Key: "Pre-shared key for Secure Authentication Version 5 (SAv5).",
      },
    },
  
    fsi: {
      isEnabled: "Enable or disable Fault Status Indication (FSI).",
      pollingFrequency: "Interval to check device status (in seconds).",
      unsolicitedResponseEnabled: "Allow unsolicited responses from device.",
      
      class1: {
        minimumValue: "Minimum severity value for Class 1 alarms.",
        maximumValue: "Maximum severity value for Class 1 alarms.",
      },
      class2: {
        minimumValue: "Minimum severity value for Class 2 alarms.",
        maximumValue: "Maximum severity value for Class 2 alarms.",
      },
      class3: {
        minimumValue: "Minimum severity value for Class 3 alarms.",
        maximumValue: "Maximum severity value for Class 3 alarms.",
      },
    },
  };
  
  export const mappingEntryTooltips = {
    pointName: "Descriptive name for the data point.",
    group: "DNP3 group number defining the data type.",
    variation: "Specific variation of the selected group.",
    index: "Index of the point in the outstation.",
    class: "Event class for the point (1, 2, or 3).",
    unsolicitedEnabled: "Allow the outstation to send spontaneous updates.",
  };
export const severityClassTooltips = {
    maximumValue: "Maximum severity value for the class.",
    minimumValue: "Minimum severity value for the class.",
  };  