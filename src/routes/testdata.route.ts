import Route from "./route";
import testdataController from "@/controllers/testdata.controller";
import multer from 'multer';
import { storage } from "@/controllers/testdata.controller";

const upload = multer({ storage });

class TestDataRoute extends Route {

  private testdataController: testdataController = new testdataController();

  constructor() {
    super();
    this.prefix = "/testdata";
    this.setRoutes();
  }
  
  protected setRoutes(): void {
    this.router.post("/addTestcase", upload.single('file'), (req, res) => this.testdataController.uploadHandler(req, res));
  
  }
}

export default TestDataRoute;