import { Router } from "express";

abstract class Route {
  protected router = Router();
  protected abstract setRoutes(): void;
  // 只能在繼撐的類別中修改 protected
  protected prefix : string = "/";

  public getRouter() {
    return this.router;
  }

  public getPrefix(){
    return this.prefix;
  }
}

export default Route;
