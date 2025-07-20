import type { Configuration } from "@/types/config";

export function validateConfiguration(
  config: Configuration
): Record<string, string[]> {
  const errors: Record<string, string[]> = {
    basic: [],
    tcpip: [],
    serial: [],
    auth: [],
    fsi: [],
    mapping: [],
  };

  // Address Validation
  if (!config.address?.trim()) {
    errors.basic.push("Address is required.");
  }

  const address = Number(config.address); // convert to number if it's a string

  // Check if the address contains only numeric characters
  const numericRegex = /^[0-9]+$/;
  if (!numericRegex.test(config.address)) {
    errors.basic.push("Address must contain only numeric characters.");
  } else if (isNaN(address) || address < 0 || address > 65519) {
    errors.basic.push("Address must be between 0 and 65519.");
  }

  // Scheduled Apply Time Validation
  if (!config.scheduledApplyTime?.trim()) {
    errors.basic.push("Scheduled Apply Time is required.");
  }

  // TCP/IP Ip Address and Port Validation
  if (config.connection.connectionType === "TCP/IP") {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const port = Number(config.connection.tcpipConfig.port);

    if (!ipRegex.test(config.connection.tcpipConfig.ipAddress)) {
      errors.tcpip.push("Invalid IP address.");
    }

    if (isNaN(port) || port < 1 || port > 65535) {
      errors.tcpip.push("Port must be between 1–65535.");
    }
  }
  // Advanced TCP/IP Settings Validation
  // Utility: IPv4 regex (not perfect, but works well for common cases)
  const isValidIp = (ip: string): boolean =>
    /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/.test(ip);

  // Extract TCP/IP config
  const tcpip = config.connection?.tcpipConfig;

  // Local Address
  if (tcpip?.localAddress?.trim()) {
    if (!isValidIp(tcpip.localAddress.trim())) {
      errors.tcpip.push("Local Address must be a valid IPv4 address.");
    }
  }

  // Remote Address
  if (tcpip?.remoteAddress?.trim()) {
    if (!isValidIp(tcpip.remoteAddress.trim())) {
      errors.tcpip.push("Remote Address must be a valid IPv4 address.");
    }
  }

  // Period
  if (tcpip?.period != null && tcpip.period !== "") {
    const period = Number(tcpip.period);
    if (isNaN(period) || period <= 0) {
      errors.tcpip.push("Period must be a positive number.");
    }
  }

  // Timeout
  if (tcpip?.timeout != null && tcpip.timeout !== "") {
    const timeout = Number(tcpip.timeout);
    if (isNaN(timeout) || timeout <= 0) {
      errors.tcpip.push("Timeout must be a positive number.");
    }
  }

  // RS-485
  if (config.connection.connectionType === "RS-485") {
    if (!String(config.connection.rs485Config.baudRate ?? "").trim()) {
      errors.serial.push("Baud Rate is required.");
    }
    if (!String(config.connection.rs485Config.dataBits ?? "").trim()) {
      errors.serial.push("Data Bits are required.");
    }
  }
  // Advanced RS-485 Settings Validation

  // Secure Authentication
  if (!config.connection.sav5Config.sav5Key?.trim()) {
    errors.auth.push("SAv5 Key is required.");
  }

  // FSI
  // Polling Frequency Validation
  // Class Settings Validation
  const ranges = ["class1", "class2", "class3"].map((cls) => {
    const { minimumValue, maximumValue } =
      config.fsi[cls as "class1" | "class2" | "class3"];
    return { cls, min: minimumValue, max: maximumValue };
  });

  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];
      const overlaps = a.min <= b.max && b.min <= a.max;
      if (overlaps) {
        errors.fsi.push(
          `Class ${a.cls.replace("class", "")} and Class ${b.cls.replace(
            "class",
            ""
          )} have overlapping value ranges.`
        );
      }
    }
  }

  if (config.fsi.isEnabled) {
    if (config.fsi.pollingFrequency < 1 || config.fsi.pollingFrequency > 3600) {
      errors.fsi.push("Polling frequency must be between 1 and 3600 seconds.");
    }
    ["class1", "class2", "class3"].forEach((cls) => {
      const settings = config.fsi[cls as "class1" | "class2" | "class3"];
      if (settings.minimumValue == null || settings.maximumValue == null) {
        errors.fsi.push(`${cls} min and max values are required.`);
      }
    });
  }

  // Mapping
  const allMappings = [
    ...config.mapping.binaryInputs,
    ...config.mapping.analogInputs,
    ...config.mapping.commandOutputs,
  ];
  allMappings.forEach((entry, idx) => {
    if (!entry.pointName?.trim()) {
      errors.mapping.push(`Mapping entry ${idx + 1} is missing a point name.`);
    }
    // Add any other mapping field validations here
  });

  return errors;
}
