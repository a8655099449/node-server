import koaBody from "koa-body";
import Router from "koa-router";
const fileRouter = new Router();

import path from "path";

fileRouter.post(
  "/upload",
  koaBody({
    multipart: true, // 允许上传文件
    formidable: {
      maxFileSize: 10 * 1024 * 1024,
      uploadDir: path.join(__dirname, "../../public/uploads"),
      keepExtensions: true,
      onFileBegin(name, file) {
        file.newFilename = file.filepath.split("\\").pop();
      },
    },
  }),
  async (ctx) => {
    const file: any = ctx.request.files.file;

    if (!file) {
      ctx.body = "上传失败，请选择上传文件";
      return;
    }

    ctx.body = {
      code: "ok",
      path: file.newFilename,
      file: file,
    };
  }
);

export default fileRouter;
