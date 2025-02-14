// src/class/main/Setup.ts
var Setup = class {
  /**
   * Sets the global panel URL for API requests.
   * @param {string} url - The URL of the Pterodactyl panel.
   */
  static setPanel(url) {
    this.panelUrl = url;
  }
  /**
   * Retrieves the globally set panel URL.
   * @returns {string} The panel URL.
   */
  static getPanel() {
    if (!this.panelUrl) {
      throw new Error("Panel URL is not set. Use `Setup.setPanel(url)` before making requests.");
    }
    return this.panelUrl;
  }
};

// src/functions/createAppCall.ts
import axios from "axios";
async function ApplicationAPICall(options) {
  const url = `${options.panel}/api/application/${options.endpoint}`;
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${options.apiKey}`
  };
  let body = void 0;
  if (options.body && options.method !== "GET" && options.method !== "DELETE") {
    body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }
  try {
    if (options.method === "PATCH") {
      const response = await axios.patch(url, options.body, { headers });
      return response.data;
    } else {
      const response = await fetch(url, {
        method: options.method,
        headers,
        body
      });
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}: ${await response.text()}`);
      }
      return await response.json();
    }
  } catch (error) {
    throw new Error(`Error in API call: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// src/class/source/app/users/listUsers.ts
async function listUsers(options) {
  const body = {
    servers: options.showLinkedServers ?? false,
    filters: {
      email: options.filters?.email ?? null,
      uuid: options.filters?.uuid ?? null,
      username: options.filters?.username ?? null,
      external_id: options.filters?.external_id ?? null
    },
    sortBy: {
      id: options.sortBy?.id ?? false,
      uuid: options.sortBy?.uuid ?? false
    }
  };
  return ApplicationAPICall({
    panel: options.panel,
    apiKey: options.apiKey,
    endpoint: "users",
    method: "GET",
    body: JSON.stringify(body)
  });
}

// src/class/source/app/users/userDetails.ts
async function userDetails(options) {
  return ApplicationAPICall({
    panel: options.panel,
    apiKey: options.apiKey,
    endpoint: `user/${options.user_id}`,
    method: "GET",
    body: JSON.stringify({ servers: options.listServers ?? false })
    // Ensuring body is a string
  });
}

// src/class/source/app/users/userDetails_externalId.ts
async function userDetailsByExternalIdentifier(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `users/external/${options.external_id}`,
    body: JSON.stringify({ servers: options.listServers ?? false })
    // Ensuring body is a JSON string
  });
}

// src/class/source/app/users/createUser.ts
async function createUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "users",
    body: JSON.stringify({
      email: options.user_details.email,
      username: options.user_details.username,
      first_name: options.user_details.first_name ?? "Pterodactyl",
      last_name: options.user_details.last_name ?? "User"
    })
  });
}

// src/class/source/app/users/updateUser.ts
async function updateUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    endpoint: `users/${options.user_id}`,
    // Fixed endpoint (removed extra "/")
    method: "PATCH",
    body: JSON.stringify(options.data)
    // Ensured the body is stringified
  });
}

// src/class/source/app/users/deleteUser.ts
async function deleteUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `users/${options.identifier}`
  });
}

// src/class/main/Application.ts
var Application = class {
  constructor(apiKey) {
    /** User Management */
    this.users = {
      list: () => listUsers({ apiKey: this.apiKey, panel: this.panel }),
      getDetails: (user_id) => userDetails({ apiKey: this.apiKey, panel: this.panel, user_id }),
      getDetailsByExternalId: (external_id) => userDetailsByExternalIdentifier({ apiKey: this.apiKey, panel: this.panel, external_id }),
      create: (user_details) => createUser({ apiKey: this.apiKey, panel: this.panel, user_details }),
      update: (user_id, user_data) => updateUser({ apiKey: this.apiKey, panel: this.panel, user_id: parseInt(user_id), data: user_data }),
      delete: (user_id) => deleteUser({ apiKey: this.apiKey, panel: this.panel, identifier: parseInt(user_id) })
    };
    this.apiKey = apiKey;
    this.panel = Setup.getPanel();
  }
};

// src/class/source/client/account/accountDetails.ts
async function accountDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "account"
  });
}

// src/class/source/client/account/2faEnable.ts
async function twoFactorEnable(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "account/two-factor",
    body: { codes: options.codes }
  });
}

// src/class/source/client/account/2faDisable.ts
async function twoFactorDisable(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: "account/two-factor",
    body: { tokens: options.tokens }
  });
}

// src/class/source/client/account/updateEmail.ts
async function updateEmail(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: "account/email",
    body: {
      email: options.email,
      password: options.password
    }
  });
}

// src/class/source/client/account/updatePassword.ts
async function updatePassword(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: "account/password",
    body: {
      current_password: options.current_password,
      password: options.new_password
    }
  });
}

// src/class/source/client/account/createApiKey.ts
async function createApiKey(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "account/api-keys",
    body: {
      description: options.description,
      allowed_ips: options.allowed_ips
    }
  });
}

// src/class/source/client/account/deleteApiKey.ts
async function deleteApiKey(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `account/api-keys/${options.key_id}`
  });
}

// src/class/source/client/account/listApiKeys.ts
async function listApiKeys(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "account/api-keys"
  });
}

// src/class/source/client/servers/listServers.ts
async function listServers(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "servers"
  });
}

// src/class/source/client/servers/showPermissions.ts
async function showPermissions(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/permissions`
  });
}

// src/class/source/client/servers/files/listFiles.ts
async function listFiles(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/list${options.directory ? `?directory=${options.directory}` : ""}`
  });
}

// src/class/source/client/servers/files/getFileContent.ts
async function getFileContent(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/contents?file=${encodeURIComponent(options.file_path)}`
  });
}

// src/class/source/client/servers/files/downloadFile.ts
async function downloadFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/download?file=${encodeURIComponent(options.file_path)}`
  });
}

// src/class/source/client/servers/files/renameFile.ts
async function renameFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: `servers/${options.server_id}/files/rename`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/copyFile.ts
async function copyFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/copy`,
    body: JSON.stringify({ location: options.file_path })
  });
}

// src/class/source/client/servers/files/writeFile.ts
async function writeFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/write`,
    body: JSON.stringify({
      file: options.file_path,
      contents: options.content
    })
  });
}

// src/class/source/client/servers/files/compressFile.ts
async function compressFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/compress`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/decompressFile.ts
async function decompressFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/decompress`,
    body: JSON.stringify({ file: options.file_path })
  });
}

// src/class/source/client/servers/files/deleteFile.ts
async function deleteFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/delete`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/createFolder.ts
async function createFolder(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/create-folder`,
    body: JSON.stringify({ name: options.folder_path })
  });
}

// src/class/source/client/servers/files/uploadFile.ts
import axios2 from "axios";
async function uploadFile(options) {
  return axios2.post(`${options.panel}/api/client/servers/${options.server_id}/files/upload`, options.file_data, {
    headers: {
      "Authorization": `Bearer ${options.apiKey}`,
      "Content-Type": "multipart/form-data"
    }
  });
}

// src/class/main/Client.ts
var Client = class {
  constructor(apiKey) {
    /** Account Management */
    this.account = {
      getDetails: () => accountDetails({ apiKey: this.apiKey, panel: this.panel }),
      enable2FA: (codes) => twoFactorEnable({ apiKey: this.apiKey, panel: this.panel, codes }),
      disable2FA: (tokens) => twoFactorDisable({ apiKey: this.apiKey, panel: this.panel, tokens }),
      updateEmail: (email, password) => updateEmail({ apiKey: this.apiKey, panel: this.panel, email, password }),
      updatePassword: (current_password, new_password) => updatePassword({ apiKey: this.apiKey, panel: this.panel, current_password, new_password }),
      createApiKey: (description, allowed_ips) => createApiKey({ apiKey: this.apiKey, panel: this.panel, description, allowed_ips }),
      deleteApiKey: (key_id) => deleteApiKey({ apiKey: this.apiKey, panel: this.panel, key_id }),
      listApiKeys: () => listApiKeys({ apiKey: this.apiKey, panel: this.panel })
    };
    /** Server Management */
    this.servers = {
      list: () => listServers({ apiKey: this.apiKey, panel: this.panel }),
      showPermissions: (server_id) => showPermissions({ apiKey: this.apiKey, panel: this.panel, server_id })
    };
    /** File Management */
    this.files = {
      list: (server_id) => listFiles({ apiKey: this.apiKey, panel: this.panel, server_id }),
      getContent: (server_id, file_path) => getFileContent({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      download: (server_id, file_path) => downloadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      rename: (server_id, from, to) => renameFile({ apiKey: this.apiKey, panel: this.panel, server_id, files: [{ from, to }] }),
      copy: (server_id, file_path) => copyFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      write: (server_id, file_path, content) => writeFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path, content }),
      compress: (server_id, files) => compressFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
      decompress: (server_id, file_path) => decompressFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      delete: (server_id, files) => deleteFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
      createFolder: (server_id, folder_path) => createFolder({ apiKey: this.apiKey, panel: this.panel, server_id, folder_path }),
      upload: (server_id, file_data) => uploadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_data })
    };
    this.apiKey = apiKey;
    this.panel = Setup.getPanel();
  }
};

// src/index.ts
var index_default = {
  Application,
  Client,
  Setup
};
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map