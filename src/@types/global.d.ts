declare namespace NodeJS {
  // noinspection JSUnusedGlobalSymbols
  export interface Global {
    fetch: ((
      input?: Request | string,
      init?: RequestInit
    ) => Promise<Response>);
    __INIT_MATERIAL_UI__?: any;
  }

  // noinspection JSUnusedGlobalSymbols
  export interface Process {
    browser: boolean;
  }
}
