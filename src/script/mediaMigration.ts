import dotenv from "dotenv"
dotenv.config()
import fs from "fs"
import { join } from "path"
import { s3Upload } from "utils/s3upload"

const path = join(__dirname, "../../media")
fs.readdir(path, async (error, filelist) => {
    if (error) {
        process.exit(0)
    }
    await Promise.all([
        filelist.forEach((name: string) => {
            s3Upload(`${path}/${name}`, name)
        })
    ])
})